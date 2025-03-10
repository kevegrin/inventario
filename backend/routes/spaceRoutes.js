const express = require('express');
const router = express.Router();
const Space = require('../models/Space');  // Import the Space model

// POST route to create a new space
router.post('/', async (req, res) => {
  const { id, type, capacity, description, available } = req.body;

  // Validate required fields
  if (!id || !type || !capacity) {
    return res.status(400).json({ message: 'ID, type, and capacity are required.' });
  }

  try {
    const newSpace = new Space({ id, type, capacity, description, available });
    await newSpace.save();
    res.status(201).json(newSpace);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create space', error });
  }
});

// GET route to fetch all spaces
router.get('/', async (req, res) => {
  try {
    const spaces = await Space.find();
    res.status(200).json(spaces);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch spaces', error });
  }
});

// GET route to fetch a single space by ID
router.get('/:id', async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    res.status(200).json(space);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch space', error });
  }
});

// PUT route to update a space
router.put('/:id', async (req, res) => {
  try {
    const updatedSpace = await Space.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSpace) {
      return res.status(404).json({ message: 'Space not found' });
    }
    res.status(200).json(updatedSpace);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update space', error });
  }
});

// DELETE route to delete a space
router.delete('/:id', async (req, res) => {
  try {
    const deletedSpace = await Space.findByIdAndDelete(req.params.id);
    if (!deletedSpace) {
      return res.status(404).json({ message: 'Space not found' });
    }
    res.status(200).json({ message: 'Space deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete space', error });
  }
});

module.exports = router;
