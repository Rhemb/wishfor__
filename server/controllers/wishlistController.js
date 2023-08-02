const Wishlist = require('../models/Wishlist');

module.exports = {
    findAllItems: (req, res) => {
        Wishlist.find()
            .then(allItems => res.json(allItems))
            .catch(err => res.status(400).json(err));
    },
    
    findOneItem: (req, res) => {
        Wishlist.findById(req.params.id)
            .then(oneItem => res.json(oneItem))
            .catch(err => res.status(400).json(err));
    },

    createItem: (req, res) => {
        Wishlist.create(req.body)
            .then(newItem => res.json(newItem))
            .catch(err => res.status(400).json(err));
    },

    updateItem: (req, res) => {
        Wishlist.findByIdAndUpdate(req.params.id, req.body, {new: true})    
            .then(updateItem => res.json(updateItem))
            .catch(err => res.status(400).json(err));
    },      

    deleteItem: (req, res) => {
        Wishlist.findByIdAndDelete(req.params.id)
            .then(deletedItem => res.json(deletedItem))
            .catch(err => res.status(400).json(err));
    }
}