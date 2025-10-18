const supabase = require('../supabase');

exports.getAllTurfs = async (req, res) => {
  try {
    const { data: turfs, error } = await supabase
      .from('turfs')
      .select('*');

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.json(turfs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTurfById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data: turf, error } = await supabase
      .from('turfs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }

    res.json(turf);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};