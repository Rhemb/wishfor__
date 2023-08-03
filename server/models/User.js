const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Must be 2 or more characters and cannot be blank."]
    },

    lastName: {
        type: String,
        required: [true, "Must be 2 or more characters and cannot be blank."]
    },

    email: {
        type: String,
        required: [true, 'Email Required.'],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },

    password: {
        type: String,
        required: [true, 'Password Required.'],
        minlength: [8, 'Password must be at least 8 or more characters and cannot be blank.']
    }
}, {timestamps: true});

UserSchema.virtual("confirmPassword")
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value )

UserSchema.pre("validate", function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords Must Match.");
    }
    next();
})

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then( hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', UserSchema);