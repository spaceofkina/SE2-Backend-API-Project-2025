const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products with pagination
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', getProduct);

// @route   POST /api/products
// @desc    Create new product
// @access  Public
router.post('/', createProduct);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Public
router.put('/:id', updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Public
router.delete('/:id', deleteProduct);

module.exports = router;