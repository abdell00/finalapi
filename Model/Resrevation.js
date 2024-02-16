const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ResrevationSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
  
    email: {
        type: String,
        unique: true,
        required: true
    },
    Phonenumber: {
        type: String,
        unique: true,
        required: true
    },
    tabel: {
        type: String,
        required: true
    },
    
   
    time: {
        type: String,
        unique: true,
        required: true
    },
   driver : {
        type: String,
        required: true
    },
    track : {
        type: String,
        required: true
    },
    bile: {
        type: String,
        required: true
    },
   
}, {
    timestamps: true
});

const Resrevationt = mongoose.model('Resrevationt', ResrevationSchema);

module.exports = Resrevationt;
