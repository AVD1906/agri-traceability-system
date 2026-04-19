const express = require('express');
const router = express.Router();

const logController = require('../controllers/logController');
const authMiddleware = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleCheck');

// GET ALL LOGS (admin only)
router.get('/', authMiddleware, adminOnly, logController.getAllLogs);

// GET LOGS BY BATCH
router.get('/:batchId', authMiddleware, logController.getLogsByBatch);

// CREATE LOG
router.post('/', authMiddleware, logController.createLog);

module.exports = router;