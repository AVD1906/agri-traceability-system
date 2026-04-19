const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');

router.post('/', batchController.createBatch);
router.get('/', batchController.getAllBatches);

// 🔥 MOVE THIS UP
router.put('/verify/:id', batchController.verifyBatch);

router.get('/product/:productId', batchController.getBatchesByProduct);
router.get('/:id', batchController.getBatchById);

module.exports = router;