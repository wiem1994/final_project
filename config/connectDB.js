const mongoose = require("mongoose");

//js est async par défaut
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });
        console.log("database is connected");
    } catch (error) {
        console.log("database is not connected", error);
    }
};

module.exports = connectDB;
