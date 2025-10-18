const supabase = require('../supabase');

exports.createBooking = async (req, res) => {
  const { turfId, date, timeSlot } = req.body;
  const userId = req.user.id; // Assuming req.user is populated by Supabase auth

  try {
    // Verify turf exists
    const { data: turf, error: turfError } = await supabase
      .from('turfs')
      .select('id')
      .eq('id', turfId)
      .single();

    if (turfError || !turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert([{ user_id: userId, turf_id: turfId, date, time_slot: timeSlot }])
      .select();

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.status(201).json({ message: 'Booking created', booking: booking[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyBookings = async (req, res) => {
  const userId = req.user.id; // Assuming req.user is populated by Supabase auth

  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        id,
        date,
        time_slot,
        turfs ( id, name, location, price )
      `)
      .eq('user_id', userId);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};