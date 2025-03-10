// models/Space.js
const mongoose = require("mongoose");

// y este es para los espacios
const SpaceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ["audiovisual", "lab", "salon"], required: true },
  capacity: { type: Number, required: true },
  description: { type: String },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Space", SpaceSchema);