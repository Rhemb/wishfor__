const WishlistController = require('../controllers/wishlistController');
const {authenticate} = require('../config/jwt-config');

module.exports = app => {
    app.get('/api/items', authenticate, WishlistController.findAllItems);
    app.get('/api/items/:id', WishlistController.findOneItem);
    app.post('/api/items', WishlistController.createItem);
    app.patch('/api/items/:id', WishlistController.updateItem);
    app.delete('/api/items/:id', WishlistController.deleteItem);
}