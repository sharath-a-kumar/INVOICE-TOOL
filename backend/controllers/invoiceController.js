const Invoice = require('../models/invoiceModel');
const Product = require('../models/productModel');
const Customer = require('../models/customerModel');

// Create a new invoice
exports.createInvoice = async (req, res) => {
    try {
        const { customerId, products, invoiceDate, dueDate } = req.body;

        // Find customer
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found',
            });
        }

        // Calculate total amount, total GST, and product details
        let totalAmount = 0;
        let totalGST = 0;
        const productDetails = [];

        for (const productId of products) {
            const product = await Product.findById(productId.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${productId.productId} not found`,
                });
            }

            const productTotal = product.rate * productId.quantity;
            const productGST = (productTotal * product.gstRate) / 100;

            totalAmount += productTotal;
            totalGST += productGST;

            productDetails.push({
                product: productId.productId,
                quantity: productId.quantity,
                rate: product.rate,
                gstRate: product.gstRate,
                total: productTotal,
                gst: productGST,
            });
        }

        const grandTotal = totalAmount + totalGST; // Grand Total calculation

        // Create new invoice
        const newInvoice = new Invoice({
            customerDetails: customerId,
            products: productDetails,
            totalAmount,
            totalGST,
            grandTotal, // Include grand total
            invoiceDate,
            dueDate,
            createdBy: req.user.id,  // assuming `req.user.id` holds the user id for "createdBy"
        });

        await newInvoice.save();

        res.status(201).json({
            success: true,
            message: 'Invoice created successfully!',
            invoice: newInvoice,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating invoice',
            error: error.message,
        });
    }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('customerDetails').exec();
        res.status(200).json({
            success: true,
            invoices,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving invoices',
            error: error.message,
        });
    }
};

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('customerDetails').exec();
        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found',
            });
        }
        res.status(200).json({
            success: true,
            invoice,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving invoice',
            error: error.message,
        });
    }
};

// Update invoice
exports.updateInvoice = async (req, res) => {
    try {
        const { customerId, products, invoiceDate, dueDate } = req.body;

        // Update the invoice
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            { customerDetails: customerId, products, invoiceDate, dueDate },
            { new: true }
        );
        if (!updatedInvoice) {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Invoice updated successfully!',
            invoice: updatedInvoice,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating invoice',
            error: error.message,
        });
    }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) {
            return res.status(404).json({
                success: false,
                message: 'Invoice not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Invoice deleted successfully!',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error deleting invoice',
            error: error.message,
        });
    }
};
