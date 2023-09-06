const mongoose = require('mongoose');
const Wishlist = require('./Wishlist');

const Category = new mongoose.Schema ({
    categoryName: {
        type: "String",
        minlength: [2, "Must be 2 or more characters."],
        required: [true, "Must add a name to the category."]
    },
    categoryDescription: {
        type: "String"
    }
}, {timestamps: true})

module.exports = Wishlist;
module.exports = mongoose.model('category', Category);