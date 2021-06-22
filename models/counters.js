const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});

module.exports = counterSchema;