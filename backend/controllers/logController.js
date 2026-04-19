const pool = require('../config/db');

// ================= GET ALL LOGS =================
const getAllLogs = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM AuditLogs ORDER BY timestamp DESC'
    );

    res.json(rows);
  } catch (error) {
    console.error('Get all logs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ================= GET LOGS BY BATCH =================
const getLogsByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;

    const [rows] = await pool.query(
      'SELECT * FROM AuditLogs WHERE batch_id = ? ORDER BY timestamp DESC',
      [batchId]
    );

    res.json(rows);
  } catch (error) {
    console.error('Get logs by batch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ================= CREATE LOG =================
const createLog = async (req, res) => {
  try {
    const { batch_id, action } = req.body;

    // user from token
    const user_id = req.user.user_id;

    await pool.query(
      'INSERT INTO AuditLogs (batch_id, user_id, action) VALUES (?, ?, ?)',
      [batch_id, user_id, action]
    );

    res.status(201).json({
      message: 'Log created successfully',
    });
  } catch (error) {
    console.error('Create log error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllLogs,
  getLogsByBatch,
  createLog,
};