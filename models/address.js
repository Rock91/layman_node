const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    address1: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
    },
    address2: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
    },
    area: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
    },
    pincode: {
        type: Number,
        trim: true,
        minlength: 1,
        maxlength: 7,
    },
    city: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
    },
    state: {
        type: String,
        trim: true,
        lowercase: true,
    },
    country: {
        type: String,
        trim: true,
        lowercase: true,
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
});

module.exports = addressSchema;