// Modules
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Utilities
import { connectToDatabase } from '../../../lib/db';

// Models
import user from '../../../models/user.mjs';


const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

export default async function handler(req, res) {

    try {
        const { isConnected, mongoose: mongooseInstance } = await connectToDatabase();

        if (!isConnected) {
            res.status(500).json({
                message: "Unable to connect to the database"
            });
            return;
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const userDetails = await user.findOne({ email });
        if (!userDetails) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, userDetails.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            {
                userId: userDetails._id,
                email: userDetails.email,
            },
            JWT_SECRET,
            {
                expiresIn: '1h',
            }
        );

        res.status(200).json({ token });
        // await mongooseInstance.connection.close();
        return;
    } catch (error) {
        res.status(500).json({ error: error });
        return;
    }
}
