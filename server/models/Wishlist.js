const mongoose = require('mongoose');
const Category = require('../models/Category');

const wishlistItem = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, "Must be 2 or more characters."]
    },
    link: {
        type: String,
        required: [true, "Link Required"]
    },
    itemImage: {
        type: String,
    },
    quantity: {
        type: Number,
        min: [1,'Quantity cannot be 0 or less.'],
        max: 99,
        required: [true, "Invalid Quantity"]
    },
    priority: {
        type: String
    },
    comments: {
        type: String
    },
    category : {
        type: String
    }
    
}, {timestamps: true});

module.exports = Category;
module.exports = mongoose.model('wishlistItem', wishlistItem);