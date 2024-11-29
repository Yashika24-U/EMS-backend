const mongoose = require("mongoose")
require('dotenv').config();
const DB = process.env.DB


const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log('Database connected successfully😍')
    }
    catch (error) {
        console.log('Error connecting to db', error)
    }
}
module.exports = connectDB;
