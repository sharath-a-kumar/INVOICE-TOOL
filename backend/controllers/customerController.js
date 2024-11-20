const Customer = require('../models/customerModel');

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({ success: true, customers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving customers', error: error.message });
    }
};

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const { name, address, gstin, stateCode } = req.body;
        const newCustomer = new Customer({ name, address, gstin, stateCode });
        await newCustomer.save();
        res.status(201).json({ success: true, message: 'Customer created successfully', customer: newCustomer });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error creating customer', error: error.message });
    }
};

// Update customer details
exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCustomer) return res.status(404).json({ success: false, message: 'Customer not found' });
        res.status(200).json({ success: true, message: 'Customer updated successfully', customer: updatedCustomer });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error updating customer', error: error.message });
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) return res.status(404).json({ success: false, message: 'Customer not found' });
        res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error deleting customer', error: error.message });
    }
};
