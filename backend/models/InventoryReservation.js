const mongoose = require('mongoose');

// schema para la reserva/prestamo de material
const inventoryReservationSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory',  // referencia a inventario, esto significa que el id de este item debe existir en la coleccion de inventario
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // todo: auth, referencia a usuario, esto significa que el id de este usuario debe existir en la coleccion de usuarios
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'], // esto tambien se cambia a espanol
    default: 'pending'
  }
});

const InventoryReservation = mongoose.model('InventoryReservation', inventoryReservationSchema);

module.exports = InventoryReservation;
