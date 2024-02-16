const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const checkAuth = require('../Middleware/CheckAuth'); 

router.post('/register', async (req, res) => {
    try {
        const { Firstname, Lastname, username, email, Phonenumber, password } = req.body;
        const hashPass = await bcrypt.hashSync(password, 10);
        const data = await User.create({
            Firstname,
            Lastname,
            username,
            email,
            Phonenumber,
            password: hashPass,        });
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
        const user = await User.findOne({ email });

        if (user) {
            const checkPass = await bcrypt.compareSync(password, user.password);

            if (checkPass) {
                const token = jwt.sign({ email: user.email, id: user._id }, 'abdell', { expiresIn: '3d' });
               
                
                await user.save();
                res.json({
                    token,
                    user
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
        const data = await User.findById(req.user);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.json({ msg: err?.message });
    }
});

router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.body.refreshToken;

    try {
        const decoded = jwt.verify(refreshToken, 'abdell');
        const user = await User.findOne({ _id: decoded.id, refreshToken });

        if (!user) {
            return res.json({ msg: 'Invalid refresh token' });
        }

        const newAccessToken = jwt.sign({ email: user.email, id: user._id }, 'Ajjeni389j1naskkakn', { expiresIn: '3d' });

        res.json({
            token: newAccessToken,
            user
        });
    } catch (err) {
        console.error(err);
        res.json({ msg: 'Invalid refresh token' });
    }
});

module.exports = router;
