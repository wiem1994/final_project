const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: Number,
    cart: [],
    infoCom: [],
    userType: { type: Boolean, default: false },
    favoriteItem: [],
    order: [],
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("User", userSchema);
