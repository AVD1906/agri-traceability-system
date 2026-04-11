const logModel = require('../models/logModel');
const pool = require('../config/db');

// CREATE LOG + AUTO NOTIFICATION
exports.createLog = async (req, res) => {
  try {
    const { batch_id, user_id, location_id, stage, status } = req.body;

    console.log("Incoming request:", req.body);

    // Basic validation
    if (!batch_id || !user_id || !location_id || !stage) {
      return res.status(400).json({
        message: 'batch_id, user_id, location_id, and stage are required',
      });
    }

    //  Create log
    const result = await logModel.createLog({
      batch_id,
      user_id,
      location_id,
      stage,
      status,
    });

    console.log("Log created, ID:", result.insertId);

    //  AUTO CREATE NOTIFICATION
    try {
      const notifResult = await pool.query(
        `INSERT INTO Notifications (user_id, message)
         VALUES (?, ?)`,
        [
          user_id,
          `New log added: ${stage} stage`
        ]
      );

      console.log("Notification inserted:", notifResult);

    } catch (notifError) {
      console.error("Notification insert failed:", notifError);
    }

    //  Response
    res.status(201).json({
      message: 'Log created successfully',
      log_id: result.insertId,
    });

  } catch (error) {
    console.error('createLog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET LOGS BY BATCH
exports.getLogsByBatch = async (req, res) => {
  try {
    const batchId = req.params.batchId;

    const logs = await logModel.getLogsByBatch(batchId);

    res.json(logs);
  } catch (error) {
    console.error('getLogsByBatch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};