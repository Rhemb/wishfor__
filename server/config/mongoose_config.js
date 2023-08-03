const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/wishlist", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to Database'))
    .catch ( err => console.log('oops! An error occurred.', err))

//req model
// require('../models/Wishlist');