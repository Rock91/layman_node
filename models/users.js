const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    mobileNumber: {
        type: Number,
        trim: true,
        lowercase: true,
        index: true,
        unique: true,
        sparse: true,
    },
    countryCode: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        unique: true,
        sparse: true,
    },
    username: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        unique: true,
        sparse: true,
    },
    firstName: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
        // default: ''
    },
    lastName: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 50,
        // default: ''
    },
    isBlock: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
});

module.exports = userSchema;