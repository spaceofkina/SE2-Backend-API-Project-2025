const Product = require('../models/Product');

// @desc    Get all products with pagination
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments();

        res.status(200).json({
            success: true,
            count: products.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error: ' + error.message
        });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid product ID'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error: ' + error.message
        });
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Public
exports.createProduct = async (req, res) => {
    try {
        const { sku, name, price, stock } = req.body;

        // Validation
        if (!sku || !name || !price || stock === undefined) {
            return res.status(400).json({
                success: false,
                error: 'Please provide SKU, name, price, and stock'
            });
        }

        if (price < 0 || stock < 0) {
            return res.status(400).json({
                success: false,
                error: 'Price and stock cannot be negative'
            });
        }

        const product = await Product.create({
            sku,
            name,
            price,
            stock
        });

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'SKU already exists'
            });
        }
        res.status(400).json({
            success: false,
            error: 'Validation Error: ' + error.message
        });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Public
exports.updateProduct = async (req, res) => {
    try {
        const { price, stock } = req.body;

        // Validate price and stock if provided
        if (price !== undefined && price < 0) {
            return res.status(400).json({
                success: false,
                error: 'Price cannot be negative'
            });
        }

        if (stock !== undefined && stock < 0) {
            return res.status(400).json({
                success: false,
                error: 'Stock cannot be negative'
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid product ID'
            });
        }
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'SKU already exists'
            });
        }
        res.status(400).json({
            success: false,
            error: 'Validation Error: ' + error.message
        });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Public
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: {}
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid product ID'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error: ' + error.message
        });
    }
};