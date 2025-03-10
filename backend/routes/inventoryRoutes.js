const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory'); // Import the Inventory model

// GET route to fetch all inventory items
router.get("/", async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items); // Return all items in the inventory
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inventory items', error });
  }
});

// POST route to create a new inventory item
router.post('/', async (req, res) => {
  const { model, category, description, quantity, available } = req.body;

  // Validate required fields
  if (!model || !category || !quantity || !available) {
    return res.status(400).json({ message: 'Model, category, quantity, and available are required.' });
  }

  try {
    // Create a new inventory item using the provided data
    const newItem = new Inventory({ model, category, description, quantity, available });
    await newItem.save(); // Save to the database
    res.status(201).json(newItem); // Return the newly created item
  } catch (error) {
    res.status(500).json({ message: 'Failed to create item', error });
  }
});

// GET route to fetch a single inventory item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item); // Return the single item by ID
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch item', error });
  }
});

// PUT route to update an inventory item by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem); // Return the updated item
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item', error });
  }
});

// DELETE route to delete an inventory item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' }); // Confirmation message
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item', error });
  }
});

module.exports = router;
