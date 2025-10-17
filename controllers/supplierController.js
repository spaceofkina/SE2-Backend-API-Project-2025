const Supplier = require('../models/Supplier');

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Public
exports.getSuppliers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const suppliers = await Supplier.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Supplier.countDocuments();

        res.status(200).json({
            success: true,
            count: suppliers.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: suppliers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error: ' + error.message
        });
    }
};

// @desc    Get single supplier
// @route   GET /api/suppliers/:id
// @access  Public
exports.getSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({
                success: false,
                error: 'Supplier not found'
            });
        }

        res.status(200).json({
            success: true,
            data: supplier
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid supplier ID'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error: ' + error.message
        });
    }
};

// @desc    Create new supplier
// @route   POST /api/suppliers
// @access  Public
exports.createSupplier = async (req, res) => {
    try {
        const { name, contact } = req.body;

        if (!name || !contact || !contact.email) {
            return res.status(400).json({
                success: false,
                error: 'Please provide name and contact email'
            });
        }

        const supplier = await Supplier.create({
            name,
            contact
        });

        res.status(201).json({
            success: true,
            data: supplier
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Validation Error: ' + error.message
        });
    }
};

// @desc    Update supplier
// @route   PUT /api/suppliers/:id
// @access  Public
exports.updateSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!supplier) {
            return res.status(404).json({
                success: false,
                error: 'Supplier not found'
            });
        }

        res.status(200).json({
            success: true,
            data: supplier
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid supplier ID'
            });
        }
        res.status(400).json({
            success: false,
            error: 'Validation Error: ' + error.message
        });
    }
};

// @desc    Delete supplier
// @route   DELETE /api/suppliers/:id
// @access  Public
exports.deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndDelete(req.params.id);

        if (!supplier) {
            return res.status(404).json({
                success: false,
                error: 'Supplier not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Supplier deleted successfully',
            data: {}
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid supplier ID'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error: ' + error.message
        });
    }
};