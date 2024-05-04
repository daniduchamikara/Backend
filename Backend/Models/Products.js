const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema(
    {
        ProductName: {
            type: String,
            required: true,
        },
        ProductPrice: {
            type: Number,
            required: true,
        },
        ProductBarcode: {
            type: Number,
            required: true,
        },
        ProductQty: {
            type: Number,
            required: false,
        },
        ReOrderLevel: {
            type: Number,
            required: false,
        },
        PurchaseDate: {
            type: Number,
            required: false,
        },
    });

const Products = mongoose.model("Products", ProductSchema)
module.exports = Products;
