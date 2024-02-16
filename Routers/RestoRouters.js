const Resto = require('../Model/Resto');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const checkAuth = require('../Middleware/CheckAuth');
const { v2 } = require('cloudinary');
const express = require('express');

v2.config({     cloud_name: 'drqkgx7vs', 
    api_key: '936686659573578', 
    api_secret: 'fJoj8X7YE-OZYrw8bdmvRqNezi8' 
});

router.get('/register', checkAuth, async (req, res) => {
    try {
        const data = await Resto.findById(req.user);
        res.json(data);
    } catch (err) {
        console.error('Error fetching restaurant profile:', err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

router.get("/all", checkAuth, async (req, res) => {
    try {
        const data = await Resto.find();
        res.json(data);
    } catch (err) {
        console.error('Error fetching restaurant profile:', err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
})


router.post('/addimg', async (req, res) => {
    try {
        const result = await v2.uploader.upload(req.files.RestoPic.path);
        res.json({
            url: result.url
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { Name, Local, email, Phonenumber, type, url, password, menu, description, Tabel, Raiting, Review, owner } = req.body;

        const existingResto = await Resto.findOne({ RestoPic: url });

        if (existingResto) {
            return res.status(409).json({ error: 'Image URL already exists' });
        }

        const hashPass = await bcrypt.hashSync(password, 10);
        const data = await Resto.create({
            Name,
            Local,
            email,
            Phonenumber,
            type,
            RestoPic: url,
            password: hashPass,
            menu,
            description,
            Tabel,
            Raiting,
            Review,
            owner,
        });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err?.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const resto = await Resto.findOne({ email });

        if (resto && bcrypt.compareSync(password, resto.password)) {
            const token = jwt.sign({ email: resto.email, id: resto._id }, 'sjhe7uh', { expiresIn: '3d' });
            await resto.save();
            res.json({
                token,
                resto
            });
        } else {
            res.status(401).json({ msg: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err?.message });
    }
});

router.delete('/delete/:id', checkAuth, async (req, res) => {
    try {
        const { id } = req.params;
        await Resto.findByIdAndDelete(id);
        res.json({ msg: 'Done' });
    } catch (err) {
        res.status(500).json({ err: err?.message });
    }
});
router.put('/update', checkAuth, async (req, res) => {
    try {
        const {   email, Phonenumber, type, url, password, menu, description, Tabel,  } = req.body;

        
       
        const data = await Resto.findByIdAndUpdate(req.user, req.body, { new: true });

        if (!data) {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err?.message });
    }

});

module.exports = router;
