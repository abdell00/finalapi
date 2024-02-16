const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const cliirevSchema = new mongoose.Schema({
    ratings: {
        type: String,
        required: true
    },
    reviews: {
        type: String,
        required: true
    },
   
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

const clii = mongoose.model('cliirev', cliirevSchema);

module.exports = clii;
