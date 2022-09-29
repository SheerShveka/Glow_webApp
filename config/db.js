const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect("mongodb://localhost:27017/Glow", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Connected to ${conn.connection.host}`);
}

module.exports = connectDB;