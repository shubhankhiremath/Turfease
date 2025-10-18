const express = require('express');
const router = express.Router();
const turfController = require('../controllers/turfController');

// Get all turfs
router.get('/', turfController.getAllTurfs);

// Get single turf by ID
router.get('/:id', turfController.getTurfById);

module.exports = router;