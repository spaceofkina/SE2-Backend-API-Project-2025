const express = require('express');
const router = express.Router();
const {
    getSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier
} = require('../controllers/supplierController');

// @route   GET /api/suppliers
// @desc    Get all suppliers with pagination
// @access  Public
router.get('/', getSuppliers);

// @route   GET /api/suppliers/:id
// @desc    Get single supplier by ID
// @access  Public
router.get('/:id', getSupplier);

// @route   POST /api/suppliers
// @desc    Create new supplier
// @access  Public
router.post('/', createSupplier);

// @route   PUT /api/suppliers/:id
// @desc    Update supplier
// @access  Public
router.put('/:id', updateSupplier);

// @route   DELETE /api/suppliers/:id
// @desc    Delete supplier
// @access  Public
router.delete('/:id', deleteSupplier);

module.exports = router;