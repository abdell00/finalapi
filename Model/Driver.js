const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DriversSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        
    },
    Lastname: {
        type: String,
        
    },
    DriverID: {
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
    IdentificationCard: {
        type: String,
        unique: true,
        
    },
    password: {
        type: String,
        
    },
    facePic: {
        type: String,
        
    },
    car: {
        type: String,
        
    },
    car: {
        type: String
    },
  
    experience: {
        type: String
    },
    carimg: {
        type: String
    },
}, {
    timestamps: true
});

const Driver = mongoose.model('Driver', DriversSchema);

module.exports = Driver;
