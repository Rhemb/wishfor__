const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        try {
            const user = await User.findOne({email : req.body.email});
            if(user){
                return res.status(400).json({message:'Email Already Exists! Please Login'});
            } else {
                const newUser = await User.create(req.body);
                const userToken = jwt.sign({
                    id: newUser._id,
                    email: newUser.email
                }, process.env.SECRET_KEY);
                res.status(201).cookie('userToken', userToken, {httpOnly: true}).json(newUser);
            }
        }
        catch(err){
            res.status(400).json(err);
        }
    },

    login: async(req, res) => {
        try {
            const user = await User.findOne({email : req.body.email });
            if(user === null) {
                return res.status(400).json({ message: "Invalid Credentials"})
            }
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            if(!correctPassword){ 
                return res.status(400).json({ message: 'Invalid Credentials'})
            } else {
                const userToken = jwt.sign({
                    id: user._id, 
                    email: user.email
                }, process.env.SECRET_KEY)
                res.status(200).cookie('userToken', userToken, {httpOnly: true}).json({message: 'Logged in Successfully!'});
            }
        }
        catch(err){
            res.status(400).json(err);
        }
    },

    logout: (req, res) => {
        res.clearCookie('userToken');
        res.sendStatus(200);
    }
}