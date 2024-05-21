// Modules
import bcrypt from 'bcryptjs';

// Utilities
import { connectToDatabase } from '../../../lib/db';

// Models
import user from '../../../models/user.mjs';

export default async function handler(req, res) {
    try {
        const { isConnected, mongoose: mongooseInstance } = await connectToDatabase();

        if (!isConnected) {
            res.status(500).json({
                message: "Unable to connect to the database"
            });
            return;
        }

        const { first_name, last_name, email, phone_number, user_type, password } = req.body;

        if (!first_name || !last_name || !email || !phone_number || !user_type || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({
            first_name,
            last_name,
            email,
            phone_number,
            user_type,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
        // await mongooseInstance.connection.close();
        return;
    } catch (error) {
        res.status(500).json({ error: error });
        return;
    }

}
