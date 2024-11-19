const Product = require('../models/productModel');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { description, rate, gstRate } = req.body;
        const newProduct = new Product({
            description,
            rate,
            gstRate,
        });
        await newProduct.save();
        res.status(201).json({
            success: true,
            message: 'Product created successfully!',
            product: newProduct,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating product',
            error: error.message,
        });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving products',
            error: error.message,
        });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving product',
            error: error.message,
        });
    }
};

// Update product details
exports.updateProduct = async (req, res) => {
    try {
        const { description, rate, gstRate } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { description, rate, gstRate },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            product: updatedProduct,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating product',
            error: error.message,
        });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error deleting product',
            error: error.message,
        });
    }
};
