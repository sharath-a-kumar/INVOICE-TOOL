const Invoice = require('../models/invoiceModel');
const Product = require('../models/productModel');
const Customer = require('../models/customerModel');
const { generateInvoiceExcel } = require('../utils/excelGenerator');

// Create a new invoice
exports.createInvoice = async (req, res) => {
    try {
        const { customerId, products, invoiceDate, dueDate, referencePONumber, modeOfDispatch } = req.body;

        // Fetch customer and validate
        const customer = await Customer.findById(customerId);
        if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });

        // Calculate totals
        let subTotal = 0;
        const items = [];
        for (const product of products) {
            const productDetails = await Product.findById(product.productId);
            if (!productDetails) return res.status(404).json({ success: false, message: `Product ${product.productId} not found` });

            const taxableValue = productDetails.rate * product.quantity;
            const gstAmount = (taxableValue * productDetails.gstRate) / 100;

            items.push({
                productId: product.productId,
                description: productDetails.description,
                sacCode: productDetails.sacCode,
                quantity: product.quantity,
                rate: productDetails.rate,
                taxableValue,
                gstRate: productDetails.gstRate,
                cgstAmount: gstAmount / 2,
                sgstAmount: gstAmount / 2,
            });

            subTotal += taxableValue;
        }

        const totalGST = items.reduce((sum, item) => sum + item.cgstAmount + item.sgstAmount, 0);
        const grandTotal = subTotal + totalGST;

        // Create invoice
        const newInvoice = await Invoice.create({
            customerDetails: customerId,
            items,
            subTotal,
            totalGST,
            grandTotal,
            invoiceDate,
            dueDate,
            referencePONumber,
            modeOfDispatch,
        });

        res.status(201).json({ success: true, message: 'Invoice created successfully', invoice: newInvoice });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating invoice', error: error.message });
    }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
    try {
        const { customerId, startDate, endDate } = req.query;

        const query = {};
        if (customerId) query['customerDetails'] = customerId;
        if (startDate && endDate) {
            query['invoiceDate'] = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const invoices = await Invoice.find(query).populate('customerDetails').exec();
        res.status(200).json({ success: true, invoices });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving invoices', error: error.message });
    }
};
// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate('customerDetails')
            .populate('items.productId')
            .exec();
        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }
        res.status(200).json({ success: true, invoice });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving invoice', error: error.message });
    }
};
// Update an invoice
exports.updateInvoice = async (req, res) => {
    try {
        const { customerId, products, invoiceDate, dueDate, referencePONumber, modeOfDispatch } = req.body;

        // Fetch and validate customer
        const customer = await Customer.findById(customerId);
        if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });

        // Calculate updated totals
        let subTotal = 0;
        const items = [];
        for (const product of products) {
            const productDetails = await Product.findById(product.productId);
            if (!productDetails) return res.status(404).json({ success: false, message: `Product ${product.productId} not found` });

            const taxableValue = productDetails.rate * product.quantity;
            const gstAmount = (taxableValue * productDetails.gstRate) / 100;

            items.push({
                productId: product.productId,
                description: productDetails.description,
                sacCode: productDetails.sacCode,
                quantity: product.quantity,
                rate: productDetails.rate,
                taxableValue,
                gstRate: productDetails.gstRate,
                cgstAmount: gstAmount / 2,
                sgstAmount: gstAmount / 2,
            });

            subTotal += taxableValue;
        }

        const totalGST = items.reduce((sum, item) => sum + item.cgstAmount + item.sgstAmount, 0);
        const grandTotal = subTotal + totalGST;

        // Update invoice
        const updatedInvoice = await Invoice.findByIdAndUpdate(
            req.params.id,
            {
                customerDetails: customerId,
                items,
                subTotal,
                totalGST,
                grandTotal,
                invoiceDate,
                dueDate,
                referencePONumber,
                modeOfDispatch,
            },
            { new: true }
        );

        if (!updatedInvoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        res.status(200).json({ success: true, message: 'Invoice updated successfully', invoice: updatedInvoice });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating invoice', error: error.message });
    }
};
// Delete an invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }
        res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting invoice', error: error.message });
    }
};
exports.exportInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('customerDetails').populate('items.productId');
        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        const filePath = `./invoices/invoice-${invoice.invoiceNumber}.xlsx`;
        await generateInvoiceExcel(invoice, filePath);

        res.download(filePath, `invoice-${invoice.invoiceNumber}.xlsx`);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error exporting invoice', error: error.message });
    }
};