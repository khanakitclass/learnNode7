const mongoose = require('mongoose');

const connectMangoDB = async () => {
    try {
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/newdata');

        console.log("Connected to MongoDB", connection.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


module.exports = connectMangoDB;
