const mongoose = require('mongoose');
const Customer = require('./customerModel');
const Product = require('./productModel');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    companyDetails: {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        gstin: {
            type: String,
            required: true,
        },
    },
    customerDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // References the Customer model
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // References the Product model
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            gstAmount: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    totalGST: {
        type: Number,
        required: true,
    },
    grandTotal: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        required: true,
    },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
