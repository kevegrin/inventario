// models/Inventory.js
const mongoose = require("mongoose");

// schema (template) de database para material de inventario
const InventorySchema = new mongoose.Schema({
  model: { type: String, required: true },
  category: { type: String, enum: ["sistema", "cable", "componente", "proyector"], required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  available: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Inventory", InventorySchema);
