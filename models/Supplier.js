const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Supplier name is required'],
        trim: true
    },
    contact: {
        email: {
            type: String,
            required: [true, 'Contact email is required'],
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            trim: true
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Supplier', supplierSchema);