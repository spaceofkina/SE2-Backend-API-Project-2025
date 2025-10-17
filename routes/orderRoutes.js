const express = require('express');
const router = express.Router();
const {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController');

// @route   GET /api/orders
// @desc    Get all orders with pagination
// @access  Public
router.get('/', getOrders);

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Public
router.get('/:id', getOrder);

// @route   POST /api/orders
// @desc    Create new order
// @access  Public
router.post('/', createOrder);

// @route   PUT /api/orders/:id
// @desc    Update order status
// @access  Public
router.put('/:id', updateOrder);

// @route   DELETE /api/orders/:id
// @desc    Delete order
// @access  Public
router.delete('/:id', deleteOrder);

module.exports = router;