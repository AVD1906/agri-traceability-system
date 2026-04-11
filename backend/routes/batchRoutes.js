const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');

router.post('/', batchController.createBatch);
router.get('/product/:productId', batchController.getBatchesByProduct);
router.get('/:id', batchController.getBatchById);

module.exports = router;