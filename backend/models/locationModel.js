const pool = require('../config/db');

// CREATE LOCATION
const createLocation = async ({ name, type, address }) => {
  const [result] = await pool.query(
    `INSERT INTO Locations (name, type, address) VALUES (?, ?, ?)`,
    [name, type, address]
  );

  return result;
};

// GET ALL
const getAllLocations = async () => {
  const [rows] = await pool.query(
    `SELECT * FROM Locations ORDER BY location_id DESC`
  );
  return rows;
};

module.exports = {
  createLocation,
  getAllLocations,
};