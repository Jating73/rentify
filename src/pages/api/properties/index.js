import { connectToDatabase } from '../../../../lib/db';

import property from '../../../../models/property.mjs';

import { getSession } from 'next-auth/react';

export default async function handler(req, res) {

    try {
        const { method } = req;

        const { isConnected, mongoose: mongooseInstance } = await connectToDatabase();

        if (!isConnected) {
            res.status(500).json({
                message: "Unable to connect to the database"
            });
            return;
        }

        switch (method) {
            case 'POST':
                try {

                    const session = await getSession({ req });

                    if (!session) {
                        return res.status(401).json({ message: 'Unauthorized' });
                    }

                    const { place, area, bedrooms, bathrooms, nearby_hospitals, nearby_colleges, description, images } = req.body;
                    const propertyDetails = new property({
                        seller_id: session.user.id,
                        place,
                        area,
                        bedrooms,
                        bathrooms,
                        nearby_hospitals,
                        nearby_colleges,
                        description,
                        images
                    });

                    await propertyDetails.save();
                    res.status(201).json(property);
                } catch (error) {
                    res.status(400).json({ message: 'Error posting property' });
                }
                break;

            case 'GET':
                try {
                    const properties = await property.find({});
                    res.status(200).json(properties);
                } catch (error) {
                    console.log(error)
                    res.status(400).json({ message: 'Error fetching properties', error });
                }
                break;

            default:
                res.setHeader('Allow', ['POST', 'GET']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }

        // await mongooseInstance.connection.close();
        return;
    } catch (error) {
        res.status(500).json({ error: error });
        return;
    }
}
