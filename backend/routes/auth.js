const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Register
router.post('/register', authController.register);

// Login (custom callback for error handling)
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!user) return res.status(400).json({ message: info?.message || 'Invalid credentials' });
    req.logIn(user, err => {
      if (err) return res.status(500).json({ message: 'Login failed' });
      
      console.log('User logged in, session:', req.session);
      return authController.login(req, res);
    });
  })(req, res, next);
});

// Logout
router.post('/logout', authController.logout);

// Get current user
router.get('/me', authController.getCurrentUser);

module.exports = router; 