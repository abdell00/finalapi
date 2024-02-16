
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const RestorSchema = new mongoose.Schema({
    Name: {
        type: String,
        
       
    },
    Local: {
        type: String,
      
    },
    email: {
        type: String,
        
        
    },
    Phonenumber: {
        type: String,
       
    
    },
    type: {
        type: String,
       
        
    },
    RestoPic: {
        type: String,
        
       
      
    },
    password: {
        type: String,
        
    },
    
    Tabel: {
        type: String,
       
    },
    Raiting: {
        type: String,
       
    },
    Review: {
        type: String,
    
    },
    
    menu: {
        type: String,
       
    },
    owner: {
        type: String,
        
    },
    description: {
        type: String,
       
    },
}, {
    timestamps: true

})


const Resto = mongoose.model('Restor', RestorSchema);


module.exports = Resto;