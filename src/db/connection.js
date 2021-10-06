//phil welsby 22 sept 2021 - connection to MongoDB Atlas

const mongoose = require('mongoose');
require('dotenv').config();

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Successfully connected to MongoDB...');
    } catch (error) {
        console.log(error);
    }
}

connection();



