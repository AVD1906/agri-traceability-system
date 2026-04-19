const pool = require('../config/db');

// 📊 Product Trace
const getProductTrace = async (req, res) => {
  try {
    const { batch_id } = req.params;

    const [rows] = await pool.query(
      `SELECT p.name AS product_name, b.batch_id, l.stage, l.timestamp, loc.name AS location
       FROM SupplyChainLogs l
       JOIN Batches b ON l.batch_id = b.batch_id
       JOIN Products p ON b.product_id = p.product_id
       JOIN Locations loc ON l.location_id = loc.location_id
       WHERE b.batch_id = ?
       ORDER BY l.timestamp ASC`,
      [batch_id]
    );

    res.json(rows);
  } catch (error) {
    console.error('Trace error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 📊 User Activity
const getUserActivity = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.name, COUNT(l.log_id) AS activity_count
       FROM Users u
       LEFT JOIN SupplyChainLogs l ON u.user_id = l.user_id
       GROUP BY u.user_id`
    );

    res.json(rows);
  } catch (error) {
    console.error('User activity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProductTrace,
  getUserActivity,
};