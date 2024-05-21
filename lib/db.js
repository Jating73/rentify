import mongoose from 'mongoose';

export async function connectToDatabase() {
    let isConnected = false;

    try {
        const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.ief6bpf.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

        // Connect to MongoDB
        await mongoose.connect(url);

        // Connection successful
        console.log("Connected to MongoDB...");
        isConnected = true;

    } catch (error) {
        isConnected = false;
        console.log("Error connecting to db...", error)
    }

    // Set up event listeners for the connection
    // mongoose.connection.on('connected', () => {
    //     console.log('Mongoose connected to the database');
    // });

    // mongoose.connection.on('error', (err) => {
    //     console.error('Mongoose connection error:', err);
    // });

    // mongoose.connection.on('disconnected', () => {
    //     console.log('Mongoose disconnected');
    // });

    // Return the connected mongoose instance
    return { isConnected, mongoose };

}