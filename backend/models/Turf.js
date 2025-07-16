const mongoose = require('mongoose');

const TurfSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ratings: Number,
  details: String,
  contact: String,
  sportsType: String,
  reviews: String,
  mapsDirections: String,
  href: String
});

module.exports = mongoose.model('Turf', TurfSchema); 