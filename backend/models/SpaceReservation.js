const mongoose = require('mongoose');

// schema para reservacion de espacios
const spaceReservationSchema = new mongoose.Schema({
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',  // ref a modelo espacio
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  //para auth despues
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
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
});

const SpaceReservation = mongoose.model('SpaceReservation', spaceReservationSchema);

module.exports = SpaceReservation;
