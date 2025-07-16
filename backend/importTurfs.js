require('dotenv').config();
const mongoose = require('mongoose');
const csv = require('csvtojson');
const path = require('path');
const Turf = require('./models/Turf');

const csvFilePath = path.join(__dirname, '../../_Turf_web_app/Turf_Data.csv');

async function importTurfs() {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const turfs = await csv().fromFile(csvFilePath);
  const formattedTurfs = turfs.filter(t => t['Turf name']).map(t => ({
    name: t['Turf name'],
    ratings: parseFloat(t['Ratings']) || undefined,
    details: t['Details '],
    contact: t['Contact '],
    sportsType: t['sports type'],
    reviews: t['Reviews'],
    mapsDirections: t['Maps Directions'],
    href: t['yYlJEf href 2']
  }));
  await Turf.deleteMany({});
  await Turf.insertMany(formattedTurfs);
  console.log('Turfs imported!');
  mongoose.disconnect();
}

importTurfs().catch(err => { console.error(err); mongoose.disconnect(); }); 