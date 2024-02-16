const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsersSchema = new mongoose.Schema({
    Firstname: {
        type: String,
    },
    Lastname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        
    },
    Phonenumber: {
        type: String,
        unique: true,
        
    },
    password: {
        type: String,
        
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', UsersSchema);

module.exports = User;
