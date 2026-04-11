const pool = require('../config/db');

const createLog = async (log) => {
  const { batch_id, user_id, location_id, stage, status } = log;

  const [result] = await pool.query(
    `INSERT INTO SupplyChainLogs (batch_id, user_id, location_id, stage, status)
     VALUES (?, ?, ?, ?, ?)`,
    [batch_id, user_id, location_id, stage, status]
  );

  return result;
};

const getLogsByBatch = async (batchId) => {
  const [rows] = await pool.query(
    `SELECT l.*, u.name AS user_name, loc.name AS location_name
     FROM SupplyChainLogs l
     JOIN Users u ON l.user_id = u.user_id
     JOIN Locations loc ON l.location_id = loc.location_id
     WHERE l.batch_id = ?
     ORDER BY l.timestamp ASC`,
    [batchId]
  );

  return rows;
};

module.exports = {
  createLog,
  getLogsByBatch,
};