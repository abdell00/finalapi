const express = require('express');
const router = express.Router();
const Resrevationt = require('../Model/Resrevation'); 

router.post('/reserve', async (req, res) => {
    try {
        const { user, email, Phonenumber, tabel, driver, time, bile } = req.body;
        
        const newReservation = await Resrevationt.create({
            user,
            email,
            Phonenumber,
            tabel,
            driver,
            time,
            bile
        });

        res.status(201).json(newReservation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

router.get('/reservations', async (req, res) => {
    try {
        const allReservations = await Resrevationt.find();
        res.json(allReservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

router.get('/reservations/:id', async (req, res) => {
    try {
        const reservation = await Resrevationt.findById(req.params.id);
        
        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }

        res.json(reservation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

router.put('/reservations/:id', async (req, res) => {
    try {
        const { user, email, Phonenumber, tabel, driver, time, bile } = req.body;
        
        const updatedReservation = await Resrevationt.findByIdAndUpdate(
            req.params.id,
            { user, email, Phonenumber, tabel, driver, time, bile },
            { new: true }
        );

        if (!updatedReservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }

        res.json(updatedReservation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

router.delete('/reservations/:id', async (req, res) => {
    try {
        const deletedReservation = await Resrevationt.findByIdAndDelete(req.params.id);

        if (!deletedReservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }

        res.json({ msg: 'Reservation deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

module.exports = router;
