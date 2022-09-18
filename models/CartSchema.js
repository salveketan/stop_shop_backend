const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    img_url: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: false },
    category: { type: String, required: false },
    quantiy: { type: Number, required: false, default: 1 },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", required: false
    }
})

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;