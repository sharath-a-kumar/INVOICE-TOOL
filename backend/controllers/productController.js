const Product = require('../models/productModel');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving products', error: error.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { description, sacCode, rate, gstRate } = req.body;
        const newProduct = new Product({ description, sacCode, rate, gstRate });
        await newProduct.save();
        res.status(201).json({ success: true, message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error creating product', error: error.message });
    }
};

// Update product details
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error updating product', error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error deleting product', error: error.message });
    }
};
