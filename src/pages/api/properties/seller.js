import { connectToDatabase } from '../../../../lib/db';

import property from '../../../../models/property.mjs';

import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    try {
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

        try {
            const properties = await property.find({ seller_id: session.user.id });
            res.status(200).json(properties);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching properties' });
        }

        // await mongooseInstance.connection.close();
        return;
    } catch (error) {
        res.status(500).json({ error: error });
        return;
    }
}
