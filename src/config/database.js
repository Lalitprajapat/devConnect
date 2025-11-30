const mongoose = require('mongoose');
const db_URL = require('../utils/constants');
const connectDB = async () => {
    await mongoose.connect(
        db_URL,
    );
};

module.exports = connectDB;

