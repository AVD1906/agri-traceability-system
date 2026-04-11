const pool = require('../config/db');

const createBatch = async (batch) => {
  const { product_id, quantity, harvest_date, expiry_date } = batch;

  const [result] = await pool.query(
    `INSERT INTO Batches (product_id, quantity, harvest_date, expiry_date)
     VALUES (?, ?, ?, ?)`,
    [product_id, quantity, harvest_date, expiry_date]
  );

  return result;
};

const getBatchesByProduct = async (productId) => {
  const [rows] = await pool.query(
    `SELECT * FROM Batches WHERE product_id = ?`,
    [productId]
  );
  return rows;
};

const getBatchById = async (batchId) => {
  const [rows] = await pool.query(
    `SELECT * FROM Batches WHERE batch_id = ?`,
    [batchId]
  );
  return rows[0];
};

module.exports = {
  createBatch,
  getBatchesByProduct,
  getBatchById,
};