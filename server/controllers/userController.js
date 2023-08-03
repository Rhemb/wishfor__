const User = require('../models/User');
const bcrypt = require('bcrypt')

module.exports = {
    register: (req, res) => {
        User.create(req.body)
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
    }
}