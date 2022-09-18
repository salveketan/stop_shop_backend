const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    img_url: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: false },
    quantiy: { type: String, required: false }
})

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;