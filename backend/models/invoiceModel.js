const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    // Header Information
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    invoiceDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
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
        stateCode: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
    },
    eSugamDetails: {
        type: String, // Add if applicable
        required: false,
    },

    // Customer Information
    customerDetails: {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
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
        stateCode: {
            type: String,
            required: true,
        },
    },

    // Order Information
    orderDetails: {
        referencePONumber: {
            type: String,
            required: false,
        },
        referencePODate: {
            type: Date,
            required: false,
        },
        deliveryChallanNumber: {
            type: String,
            required: false,
        },
        deliveryChallanDate: {
            type: Date,
            required: false,
        },
        modeOfDispatch: {
            type: String,
            enum: ['Road', 'Rail', 'Air'], // Limited options
            required: false,
        },
        vehicleNumber: {
            type: String,
            required: false,
        },
        ewayBillNumber: {
            type: String,
            required: false,
        },
    },

    // Item Details
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            sacCode: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            rate: {
                type: Number,
                required: true,
            },
            taxableValue: {
                type: Number,
                required: true,
            },
            gstRate: {
                type: Number,
                required: true,
            },
            cgstAmount: {
                type: Number,
                required: false,
            },
            sgstAmount: {
                type: Number,
                required: false,
            },
            igstAmount: {
                type: Number,
                required: false,
            },
        },
    ],

    // Summary
    subTotal: {
        type: Number,
        required: true,
    },
    roundOff: {
        type: Number,
        required: true,
    },
    grandTotal: {
        type: Number,
        required: true,
    },
    amountInWords: {
        type: String,
        required: true,
    },

    // Additional Information
    termsAndConditions: {
        type: String,
        required: false,
    },
    bankDetails: {
        name: {
            type: String,
            required: false,
        },
        branch: {
            type: String,
            required: false,
        },
        accountNumber: {
            type: String,
            required: false,
        },
        micr: {
            type: String,
            required: false,
        },
        ifsc: {
            type: String,
            required: false,
        },
    },
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
