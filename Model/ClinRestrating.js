const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ClinResySchema = new mongoose.Schema({
    ratings: {
        type: String,
        required: true
    },
    reviews: {
        
            type: String,
            required: true
        }
    ,
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

const ClinResyrating = mongoose.model('ClinResy', ClinResySchema);

module.exports = ClinResyrating;
