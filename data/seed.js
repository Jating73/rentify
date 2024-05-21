import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import user from '../models/user.mjs';
import property from '../models/property.mjs';

async function createDummyData() {

    const url = ``;

    console.log(url)

    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });


    try {

        // Creating 2-3 seller users
        const sellers = await user.insertMany([
            { first_name: 'John', last_name: 'Doe', email: 'john@example.com', phone_number: '9876543210', user_type: 'seller' },
            { first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', phone_number: '9998887770', user_type: 'seller' },
            { first_name: 'Sam', last_name: 'Wilson', email: 'sam@example.com', phone_number: '8789767890', user_type: 'seller' },
        ].map(user => ({ ...user, password: bcrypt.hashSync('password123', 10) })));

        // Creating 2-3 buyer users
        await user.insertMany([
            { first_name: 'Alice', last_name: 'Brown', email: 'alice@example.com', phone_number: '2233445566', user_type: 'buyer' },
            { first_name: 'Bob', last_name: 'White', email: 'bob@example.com', phone_number: '3344556677', user_type: 'buyer' },
            { first_name: 'Charlie', last_name: 'Black', email: 'charlie@example.com', phone_number: '4455667788', user_type: 'buyer' },
        ].map(user => ({ ...user, password: bcrypt.hashSync('password123', 10) })));

        // Creating 10-20 properties for sellers
        const properties = [];

        for (let i = 0; i < 10; i++) {
            properties.push({
                seller_id: sellers[i % sellers.length]._id,
                place: `Place ${i + 1}`,
                area: 1000 + (i * 50),
                bedrooms: 2 + (i % 3),
                bathrooms: 1 + (i % 2),
                nearby_hospitals: `Hospital ${i + 1}`,
                nearby_colleges: `College ${i + 1}`,
                description: `Description of property ${i + 1}`,
                images: [`https://imagecdn.99acres.com/media1/23703/19/474079284M-171625882318${i + 1}.jpg`],
            });
        }

        await property.insertMany(properties);
        console.log('Dummy data created successfully');

    } catch (error) {
        console.error('Error creating dummy data:', error);
    } finally {
        await mongoose.connection.close();
    }
}

createDummyData()