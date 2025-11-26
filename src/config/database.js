const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Tdev_db_user:uQnNmAY8h8PfhgDj@namastedev.qzyhara.mongodb.net/devTinder",
       
    );
};

module.exports = connectDB;

