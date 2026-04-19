const express = require('express');
const router = express.Router();

const {
  getProductTrace,
  getUserActivity,
} = require('../controllers/analyticsController');

const authMiddleware = require('../middleware/authMiddleware');

// Protect routes
router.use(authMiddleware);

// Product Trace Report
router.get('/trace/:batch_id', getProductTrace);

// User Activity Report
router.get('/user-activity', getUserActivity);

module.exports = router;