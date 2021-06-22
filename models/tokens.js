const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    rand:{
        type: String,
        required: false,
    },
    expires:{
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = tokenSchema;