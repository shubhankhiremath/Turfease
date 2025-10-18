const supabase = require('../supabase');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({ message: 'User registered successfully', user: data.user });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.json({ message: 'Logged in', user: data.user });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};