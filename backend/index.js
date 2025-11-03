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
app.set('trust proxy', 1); // trust first proxy
// Configure CORS to allow frontend origin(s). Prefer setting FRONTEND_URL in the environment
// For multiple origins you can set ALLOWED_ORIGINS as a comma-separated list.
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://turfease-2jf4.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS policy: Origin not allowed'), false);
    }
  },
  credentials: true
}));
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
    // Use secure cookies in production (requires HTTPS). In development allow non-secure for localhost.
    secure: process.env.NODE_ENV === 'production',
    // For cross-site requests (Netlify frontend -> Render backend) we need 'none' in production.
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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

app.get('/api/test-session', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Number of views: ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send('Welcome! Refresh to count views.');
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
