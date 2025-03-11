const express = require('express');
const InventoryReservation = require('../models/InventoryReservation');
const router = express.Router();

// aqui son los CRUD de las reservas de inventario
router.post('/', async (req, res) => {
  const { itemId, userId, quantity, startTime, endTime } = req.body;

  if (!itemId || !userId || !quantity || !startTime || !endTime) {
    return res.status(400).json({ message: 'Missing required fields: itemId, userId, quantity, startTime, and endTime' });
  }

  try {
    const newReservation = new InventoryReservation({ itemId, userId, quantity, startTime, endTime });
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error reservacion: backend: ', error });
  }
});


// Get all reservations for an inventory item
router.get('/item/:itemId', async (req, res) => {
  const { itemId } = req.params;
  try {
    const reservations = await InventoryReservation.find({ itemId });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inventory reservations', error });
  }
});

// Get all reservations for a user
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const reservations = await InventoryReservation.find({ userId });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user inventory reservations', error });
  }
});

// Cancel an inventory reservation
router.delete('/:reservationId', async (req, res) => {
  const { reservationId } = req.params;
  try {
    const deletedReservation = await InventoryReservation.findByIdAndDelete(reservationId);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json({ message: 'Inventory reservation cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel inventory reservation', error });
  }
});

module.exports = router;
