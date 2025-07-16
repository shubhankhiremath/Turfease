const express = require('express');
const router = express.Router();
const Turf = require('../models/Turf');

// Get all turfs
router.get('/', async (req, res) => {
  try {
    const turfs = await Turf.find();
    res.json(turfs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single turf by ID
router.get('/:id', async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    if (!turf) return res.status(404).json({ message: 'Turf not found' });
    res.json(turf);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 