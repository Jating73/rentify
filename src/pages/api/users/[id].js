import { connectToDatabase } from '../../../../lib/db';

import user from '../../../../models/user.mjs';

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

        if (method === 'GET') {
            try {
                const userDetails = await user.findById(id).select('first_name last_name email phone_number');
                if (!userDetails) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(userDetails);
            } catch (error) {
                res.status(400).json({ message: 'Error fetching user' });
            }
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }

        // await mongooseInstance.connection.close();
        return;
    } catch (error) {
        res.status(500).json({ error: error });
        return;
    }

}
