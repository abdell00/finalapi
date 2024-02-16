const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const RatingsSchema = new mongoose.Schema({
    ratings: {
        type: String,
        required: true
    },
    reviews: {
        service: {
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

const Ratingsrot = mongoose.model('Ratingsrot', RatingsSchema);

module.exports = Ratingsrot;
