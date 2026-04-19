const locationModel = require('../models/locationModel');

// ================= CREATE LOCATION =================
exports.createLocation = async (req, res) => {
  try {
    const { name, type, address } = req.body;

    console.log("BODY:", req.body);

    // 🔴 VALIDATION (address is required because DB needs it)
    if (!name || !address) {
      return res.status(400).json({
        message: 'Name and address are required',
      });
    }

    const result = await locationModel.createLocation({
      name,
      type: type || "Farm",
      address,
    });

    res.status(201).json({
      message: 'Location created',
      location_id: result.insertId,
    });

  } catch (error) {
    console.error("Create location error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


// ================= GET ALL LOCATIONS =================
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await locationModel.getAllLocations();
    res.json(locations);
  } catch (error) {
    console.error("Get locations error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};