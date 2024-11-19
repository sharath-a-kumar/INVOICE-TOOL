const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Create a new invoice
router.post('/invoices', invoiceController.createInvoice);

// Get all invoices
router.get('/invoices', invoiceController.getAllInvoices);

// Get invoice by ID
router.get('/invoices/:id', invoiceController.getInvoiceById);

// Update invoice
router.put('/invoices/:id', invoiceController.updateInvoice);

// Delete an invoice
router.delete('/invoices/:id', invoiceController.deleteInvoice);

module.exports = router;
