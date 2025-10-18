const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a booking
router.post('/', bookingController.createBooking);

// List bookings for logged-in user
router.get('/my', bookingController.getMyBookings);

module.exports = router;