const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Create a new customer
router.post('/customers', customerController.createCustomer);

// Get all customers
router.get('/customers', customerController.getAllCustomers);

// Get customer by ID
router.get('/customers/:id', customerController.getCustomerById);

// Update customer details
router.put('/customers/:id', customerController.updateCustomer);

// Delete a customer
router.delete('/customers/:id', customerController.deleteCustomer);

module.exports = router;
