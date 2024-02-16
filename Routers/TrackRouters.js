const express = require('express');
const router = express.Router();
const TrackRatings = require('../Model/TrackRatings'); 

router.post('/ratings', async (req, res) => {
    try {
        const { ratings, reviews, refreshToken } = req.body;
        
        const newRating = await TrackRatings.create({
            ratings,
            reviews,
            refreshToken
        });

        res.status(201).json(newRating);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

router.get('/ratings', async (req, res) => {
    try {
        const allRatings = await TrackRatings.find();
        res.json(allRatings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

router.get('/ratings/:id', async (req, res) => {
    try {
        const rating = await TrackRatings.findById(req.params.id);
        
        if (!rating) {
            return res.status(404).json({ msg: 'Rating not found' });
        }

        res.json(rating);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

router.put('/ratings/:id', async (req, res) => {
    try {
        const { ratings, reviews, refreshToken } = req.body;
        
        const updatedRating = await TrackRatings.findByIdAndUpdate(
            req.params.id,
            { ratings, reviews, refreshToken },
            { new: true }
        );

        if (!updatedRating) {
            return res.status(404).json({ msg: 'Rating not found' });
        }

        res.json(updatedRating);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

router.delete('/ratings/:id', async (req, res) => {
    try {
        const deletedRating = await TrackRatings.findByIdAndDelete(req.params.id);

        if (!deletedRating) {
            return res.status(404).json({ msg: 'Rating not found' });
        }

        res.json({ msg: 'Rating deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

module.exports = router;
