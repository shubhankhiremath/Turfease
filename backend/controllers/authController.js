const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const user = new User({ username, email });
    await User.register(user, password);
    req.login(user, err => {
      if (err) return res.status(500).json({ message: 'Login after registration failed' });
      res.status(201).json({ message: 'User registered and logged in', user: { id: user._id, username: user.username, email: user.email } });
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.login = (req, res) => {
  // Debug: log session and user presence (do not log sensitive cookie values)
  try {
    console.log('authController.login - req.user present:', !!req.user);
    console.log('authController.login - req.session present:', !!req.session, 'sessionID:', req.sessionID);
    if (req.session && req.session.cookie) {
      console.log('authController.login - session.cookie:', { maxAge: req.session.cookie.maxAge, secure: req.session.cookie.secure, sameSite: req.session.cookie.sameSite });
    }
  } catch (e) {
    console.error('authController.login - debug logging failed', e);
  }

  res.json({ message: 'Logged in', user: { id: req.user._id, username: req.user.username, email: req.user.email } });
};

exports.logout = (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.json({ message: 'Logged out' });
  });
};

exports.getCurrentUser = (req, res) => {
  // Debug: indicate whether request has cookie header and user/session info
  try {
    console.log('authController.getCurrentUser - cookie header present:', !!req.headers.cookie);
    console.log('authController.getCurrentUser - req.user present:', !!req.user);
    console.log('authController.getCurrentUser - req.session present:', !!req.session, 'sessionID:', req.sessionID);
  } catch (e) {
    console.error('authController.getCurrentUser - debug logging failed', e);
  }

  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  res.json({ user: { id: req.user._id, username: req.user.username, email: req.user.email } });
}; 