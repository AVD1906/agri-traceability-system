const batchModel = require('../models/batchModel');

// CREATE BATCH
exports.createBatch = async (req, res) => {
  try {
    const { product_id, quantity, harvest_date, expiry_date } = req.body;

    // 🔴 VALIDATIONS (VERY IMPORTANT)
    if (!product_id || !quantity || !harvest_date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be > 0' });
    }

    if (expiry_date && expiry_date <= harvest_date) {
      return res.status(400).json({
        message: 'Expiry date must be after harvest date',
      });
    }

    const result = await batchModel.createBatch(req.body);

    res.status(201).json({
      message: 'Batch created successfully',
      batch_id: result.insertId,
    });
  } catch (error) {
    console.error('createBatch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET batches for a product
exports.getBatchesByProduct = async (req, res) => {
  try {
    const batches = await batchModel.getBatchesByProduct(req.params.productId);
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET batch by ID
exports.getBatchById = async (req, res) => {
  try {
    const batch = await batchModel.getBatchById(req.params.id);

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    res.json(batch);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};