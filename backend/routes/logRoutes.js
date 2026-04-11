const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/', logController.createLog);
router.get('/:batchId', logController.getLogsByBatch);

module.exports = router;