const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const { validateRequest } = require('../validators/requestValidator');
const { invoiceSchema } = require('../validators/schemas');
const router = express.Router();

router.post('/invoices', invoiceController.createInvoice);
router.get('/invoices', invoiceController.getAllInvoices);
router.get('/invoices/:id', invoiceController.getInvoiceById);
router.put('/invoices/:id', invoiceController.updateInvoice);
router.delete('/invoices/:id', invoiceController.deleteInvoice);
router.post('/', validateRequest(invoiceSchema), invoiceController.createInvoice);

module.exports = router;
