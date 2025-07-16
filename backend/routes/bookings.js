const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Turf = require('../models/Turf');

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: 'Not authenticated' });
}

// Create a booking
router.post('/', isAuthenticated, async (req, res) => {
  const { turfId, date, timeSlot } = req.body;
  try {
    const turf = await Turf.findById(turfId);
    if (!turf) return res.status(404).json({ message: 'Turf not found' });
    const booking = new Booking({
      user: req.user._id,
      turf: turfId,
      date,
      timeSlot
    });
    await booking.save();
    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// List bookings for logged-in user
router.get('/my', isAuthenticated, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('turf');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 