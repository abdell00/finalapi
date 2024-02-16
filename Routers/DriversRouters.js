const Driver = require('../Model/Driver');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const checkAuth = require('../Middleware/CheckAuth'); 
const { v2 } = require('cloudinary');


v2.config({     cloud_name: 'drqkgx7vs', 
    api_key: '936686659573578', 
    api_secret: 'fJoj8X7YE-OZYrw8bdmvRqNezi8' 
});

router.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const { Firstname, Lastname, DriverID, email, Phonenumber, IdentificationCard, password, facePic ,  car,    experience,carimg, } = req.body;
        const hashPass = await bcrypt.hashSync(password, 10);
        const existingResto = await Driver.findOne({ facePic: url });
        if (existingResto) {
            return res.status(409).json({ error: 'Image URL already exists' });
        }
        const data = await Driver.create({
            Firstname,
            Lastname,
            DriverID,
            email,
            Phonenumber,
            IdentificationCard,
            password: hashPass,
            facePic: url,
            car,
            experience,
            carimg,
            
            
        });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.json({
            err: err?.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Driver.findOne({ email });
        
        if (user) {
            const checkPass = await bcrypt.compareSync(password, user.password);
            
            if (checkPass) {
                const token = jwt.sign({ email: user.email, id: user._id }, 'gomycode', { expiresIn: '3d' });
                const refreshToken = generateRefreshToken(); 
                user.refreshToken = refreshToken;
                await user.save();
                
                res.json({
                    token,
                    driver: user
                });
            } else {
                res.json({ msg: "Password Wrong" });
            }
        } else {
            res.json({ msg: "User Not Found" });
        }
    } catch (err) {
        console.error(err);
        res.json({
            msg: err?.message
        });
    }
});
router.get('/profile', checkAuth, async (req, res) => {
    try {
        const data = await Driver.findById(req.user);

        if (!data) {
            return res.status(404).json({ msg: 'Driver not found' });
        }

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err?.message });
    }
});
router.post('/addimg', async (req, res) => {
    try {
        const result = await v2.uploader.upload(req.files.facePic.path);
        res.json({
            url: result.url
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});
module.exports = router;
