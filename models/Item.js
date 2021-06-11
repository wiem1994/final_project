const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    initialPrice: { type: Number, required: true },
    total: Number,
    totalCart: Number,
    rate: { type: Number, default: 0 },
});

module.exports = Item = mongoose.model("item", itemSchema);
