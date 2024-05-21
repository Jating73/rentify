import { connectToDatabase } from '../../../../lib/db';

import property from '../../../../models/property.mjs';

import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    try {
        const { method, query: { id } } = req;

        const { isConnected, mongoose: mongooseInstance } = await connectToDatabase();

        if (!isConnected) {
            res.status(500).json({
                message: "Unable to connect to the database"
            });
            return;
        }
        const session = await getSession({ req });

        if (!session) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        switch (method) {
            case 'PUT': {
                try {
                    const propertyDetails = await property.findOneAndUpdate(
                        { _id: id, seller_id: session.user.id },
                        req.body,
                        { new: true, runValidators: true }
                    );

                    if (!propertyDetails) {
                        return res.status(404).json({ message: 'Property not found' });
                    }

                    res.status(200).json(propertyDetails);
                } catch (error) {
                    res.status(400).json({ message: 'Error updating property' });
                }
                break;
            }


            case 'DELETE': {
                try {
                    const propertyDetails = await property.findOneAndDelete({ _id: id, seller_id: session.user.id });

                    if (!propertyDetails) {
                        return res.status(404).json({ message: 'Property not found' });
                    }

                    res.status(200).json({ message: 'Property deleted successfully' });
                } catch (error) {
                    res.status(400).json({ message: 'Error deleting property' });
                }
                break;
            }


            default: {
                res.setHeader('Allow', ['PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
            }
        }
        // await mongooseInstance.connection.close();
        return;
    } catch (error) {
        res.status(500).json({ error: error });
        return;
    }
}
