const mongoose = require('mongoose');

const wishlistItem = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, "Must be 2 or more characters."]
    },
    link: {
        type: String,
        required: [true, "Link Required"]
    },
    quantity: {
        type: Number,
        min: [0,'Quantity cannot be 0 or less.'],
        max: 99,
        required: [true, "Invalid Quantity"]
    },
    priority: {
        type: String
    },
    comments: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('wishlistItem', wishlistItem);