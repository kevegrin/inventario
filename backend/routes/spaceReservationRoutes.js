const express = require('express');
const SpaceReservation = require('../models/SpaceReservation');
const router = express.Router();

// esta ruta es la que nos permite hacer CRUD de las reservas de espacios

//create 
router.post('/', async (req, res) => {
  const { spaceId, userId, startTime, endTime } = req.body;

  if (!spaceId || !userId || !startTime || !endTime) {
    return res.status(400).json({ message: 'Missing required fields: spaceId, userId, startTime, and endTime' });
  }

  try {
    const newReservation = new SpaceReservation({ spaceId, userId, startTime, endTime });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create space reservation', error });
  }
});

// read por space id
router.get('/space/:spaceId', async (req, res) => {
  const { spaceId } = req.params;
  try {
    const reservations = await SpaceReservation.find({ spaceId });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch space reservations', error });
  }
});

// read por user id
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const reservations = await SpaceReservation.find({ userId });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user space reservations', error });
  }
});

// delete
router.delete('/:reservationId', async (req, res) => {
  const { reservationId } = req.params;
  try {
    const deletedReservation = await SpaceReservation.findByIdAndDelete(reservationId);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json({ message: 'Space reservation cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel space reservation', error });
  }
});

module.exports = router;
