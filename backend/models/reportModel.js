const pool = require('../config/db');

const getProductTraceReport = async (batchId) => {
  const [rows] = await pool.query(
    `SELECT p.product_name, b.batch_id, l.stage, l.timestamp, loc.name AS location
     FROM Products p
     JOIN Batches b ON p.product_id = b.product_id
     JOIN SupplyChainLogs l ON b.batch_id = l.batch_id
     JOIN Locations loc ON l.location_id = loc.location_id
     WHERE b.batch_id = ?
     ORDER BY l.timestamp ASC`,
    [batchId]
  );
  return rows;
};

const getUserActivityReport = async () => {
  const [rows] = await pool.query(
    `SELECT u.name, COUNT(l.log_id) AS activity_count
     FROM Users u
     LEFT JOIN SupplyChainLogs l ON u.user_id = l.user_id
     GROUP BY u.user_id`
  );
  return rows;
};

module.exports = {
  getProductTraceReport,
  getUserActivityReport,
};