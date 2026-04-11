const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/trace/:batchId', reportController.getProductTrace);
router.get('/activity', reportController.getUserActivity);

module.exports = router;