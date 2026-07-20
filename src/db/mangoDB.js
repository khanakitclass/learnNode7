const mongoose = require('mongoose');

const connectMangoDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected to MongoDB", connection.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


module.exports = connectMangoDB;
