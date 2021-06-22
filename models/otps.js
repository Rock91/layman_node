const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    expires: {
        type: Date,
        expires: 86400,
        required: true,
    },

}, {
    timestamps: true,
});

module.exports = otpSchema;