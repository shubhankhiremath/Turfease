require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const turfRoutes = require('./routes/turfs');
const bookingRoutes = require('./routes/bookings');
const supabase = require('./supabase');

const app = express();

// Middleware to check authentication
async function isAuthenticated(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  req.user = data.user; // Attach user to request object
  next();
}

// Middleware
app.set('trust proxy', 1); // trust first proxy
app.use(cors({ 
  origin: [
    'https://turfease-2jf4.onrender.com', // 
    'http://localhost:3000' 
  ], 
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'turf-ease-secret',
  resave: false,
  saveUninitialized: false,
  
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Placeholder route
app.get('/', (req, res) => {
  res.send('TurfEase Backend API');
});

app.use('/api/auth', authRoutes);
app.use('/api/turfs', isAuthenticated, turfRoutes);
app.use('/api/bookings', isAuthenticated, bookingRoutes);

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
