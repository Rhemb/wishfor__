const CategoryController = require('../controllers/categoryController');
const {authenticate} = require('../config/jwt-config');

module.exports = app => {
    app.get('/api/categories', authenticate, CategoryController.findAllCategories);
    app.get('/api/category/:id', CategoryController.findOneCategory);
    app.post('/api/category', CategoryController.createCategory);
    app.patch('/api/category/:id', CategoryController.updateCategory);
    app.delete('/api/category/:id', CategoryController.deleteCategory);
}
