const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product
router.post('/products', productController.createProduct);  // Ensure createProduct is defined

// Get all products
router.get('/products', productController.getAllProducts);  // Ensure getAllProducts is defined

// Get product by ID
router.get('/products/:id', productController.getProductById);  // Ensure getProductById is defined

// Update product details
router.put('/products/:id', productController.updateProduct);  // Ensure updateProduct is defined

// Delete a product
router.delete('/products/:id', productController.deleteProduct);  // Ensure deleteProduct is defined

module.exports = router;
