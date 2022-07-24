const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    image: {
        type: String,
        required: true,
    },

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    serial: {
        type: String,
        required: true,
    },
    category: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rentalCost: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        // required: true,
    },
    rentalCostType: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean, //true: available
        required: true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

let Category = mongoose.model('Category', categorySchema);
let Product = mongoose.model('Product', productSchema);

module.exports = {Category, Product};