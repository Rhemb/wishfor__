const Category = require('../models/Category');

module.exports = {
    findAllCategories: (req, res) => {
        Category.find()
            .then(allCategories => res.json(allCategories))
            .catch(err => res.status(400).json(err));
    },
    
    findOneCategory: (req, res) => {
        Category.findById(req.params.id)
            .then(oneCategory => res.json(oneCategory))
            .catch(err => res.status(400).json(err));
    },

    createCategory: (req, res) => {
        Category.create(req.body)
            .then(newCategory => res.json(newCategory))
            .catch(err => res.status(400).json(err));
    },

    updateCategory: (req, res) => {
        Category.findByIdAndUpdate(req.params.id, req.body, {new: true})    
            .then(updateCategory => res.json(updateCategory))
            .catch(err => res.status(400).json(err));
    },      

    deleteCategory: (req, res) => {
        Category.findByIdAndDelete(req.params.id)
            .then(deletedCategory => res.json(deletedCategory))
            .catch(err => res.status(400).json(err));
    }
}