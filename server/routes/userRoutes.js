const UserController = require('../controllers/userController');

module.exports = app => {
    app.post("/api/register", UserController.register);
}