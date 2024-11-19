const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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
        unique: true,
    },
    contact: {
        phone: {
            type: String,
        },
        email: {
            type: String,
        },
    },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
