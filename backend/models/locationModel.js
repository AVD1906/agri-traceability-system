const pool = require('../config/db');

const createLocation = async (location) => {
  const { name, type, address } = location;

  const [result] = await pool.query(
    `INSERT INTO Locations (name, type, address) VALUES (?, ?, ?)`,
    [name, type, address]
  );

  return result;
};

const getAllLocations = async () => {
  const [rows] = await pool.query(`SELECT * FROM Locations`);
  return rows;
};

module.exports = {
  createLocation,
  getAllLocations,
};