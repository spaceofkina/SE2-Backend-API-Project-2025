const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
exports.getOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const orders = await Order.find()
            .populate('items.productId', 'name sku')
            .populate('supplierId', 'name contact.email')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Order.countDocuments();

        res.status(200).json({
            success: true,
            count: orders.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error: ' + error.message
        });
    }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Public
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.productId', 'name sku price')
            .populate('supplierId', 'name contact');

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid order ID'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error: ' + error.message
        });
    }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res) => {
    try {
        const { items, supplierId, status } = req.body;

        // Validation
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Order must have at least one item'
            });
        }

        if (!supplierId) {
            return res.status(400).json({
                success: false,
                error: 'Supplier ID is required'
            });
        }

        // Verify all products exist and get current prices
        for (let item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: `Product not found: ${item.productId}`
                });
            }
            // Use current product price if not provided
            if (!item.price) {
                item.price = product.price;
            }
        }

        const order = await Order.create({
            items,
            supplierId,
            status: status || 'pending'
        });

        // Populate the created order for response
        const populatedOrder = await Order.findById(order._id)
            .populate('items.productId', 'name sku')
            .populate('supplierId', 'name contact.email');

        res.status(201).json({
            success: true,
            data: populatedOrder
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid product or supplier ID'
            });
        }
        res.status(400).json({
            success: false,
            error: 'Validation Error: ' + error.message
        });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Public
exports.updateOrder = async (req, res) => {
    try {
        const { status } = req.body;

        const validStatuses = ['pending', 'completed', 'cancelled'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid status. Must be: pending, completed, or cancelled'
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        ).populate('items.productId', 'name sku')
         .populate('supplierId', 'name contact.email');

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid order ID'
            });
        }
        res.status(400).json({
            success: false,
            error: 'Validation Error: ' + error.message
        });
    }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Public
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
            data: {}
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid order ID'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error: ' + error.message
        });
    }
};