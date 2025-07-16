const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  turf: { type: mongoose.Schema.Types.ObjectId, ref: 'Turf', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }
});

module.exports = mongoose.model('Booking', BookingSchema); 