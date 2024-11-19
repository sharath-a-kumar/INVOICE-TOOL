const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    gstRate: {
        type: Number,
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
