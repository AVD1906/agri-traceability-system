const locationModel = require('../models/locationModel');

// CREATE
exports.createLocation = async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(400).json({ message: 'Name and address required' });
    }

    const result = await locationModel.createLocation(req.body);

    res.status(201).json({
      message: 'Location created',
      location_id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET ALL
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await locationModel.getAllLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};