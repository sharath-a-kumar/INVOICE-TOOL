const express = require('express');
const customerController = require('../controllers/customerController');
const { validateRequest } = require('../validators/requestValidator');
const { customerSchema } = require('../validators/schemas');
const router = express.Router();

router.get('/customers', customerController.getAllCustomers);
router.post('/customers', customerController.createCustomer);
router.put('/customers/:id', customerController.updateCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);
router.post('/', validateRequest(customerSchema), customerController.createCustomer);
module.exports = router;
