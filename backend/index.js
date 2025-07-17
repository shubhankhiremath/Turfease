require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const authRoutes = require('./routes/auth');
const turfRoutes = require('./routes/turfs');
const bookingRoutes = require('./routes/bookings');
const MongoStore = require('connect-mongo');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  crypto: { secret: process.env.SESSION_SECRET || 'turf-ease-secret' },
  touchAfter: 24 * 3600
});

app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET || 'turf-ease-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport config
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Placeholder route
app.get('/', (req, res) => {
  res.send('TurfEase Backend API');
});

app.use('/api/auth', authRoutes);
app.use('/api/turfs', turfRoutes);
app.use('/api/bookings', bookingRoutes);
app.use(cors({ 
  origin: [
    'https://turfease-2jf4.onrender.com', // <-- your deployed frontend URL
    'http://localhost:3000'
  ], 
  credentials: true 
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 