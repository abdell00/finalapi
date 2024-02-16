const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const RatingsroSchema = new mongoose.Schema({
    ratings: {
        type: String,
        required: true
    },
    reviews: {
        Food: {
            type: String,
            required: true
        },
        Service: {
            type: String,
            required: true
        },
        Ambience: {
            type: String,
            required: true
        },
        Value: {
            type: String,
            required: true
        }
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

const Ratingsrot = mongoose.model('Ratingsro', RatingsroSchema);

module.exports = Ratingsrot;
