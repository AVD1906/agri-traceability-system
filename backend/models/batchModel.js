const pool = require('../config/db');

// CREATE
const createBatch = async (batch) => {
  const { product_id, quantity, harvest_date, expiry_date } = batch;

  const [result] = await pool.query(
    `INSERT INTO Batches (product_id, quantity, harvest_date, expiry_date, status)
     VALUES (?, ?, ?, ?, 'Pending')`,
    [product_id, quantity, harvest_date, expiry_date]
  );

  return result;
};

// GET ALL
const getAllBatches = async () => {
  const [rows] = await pool.query(`SELECT * FROM Batches`);
  return rows;
};

// GET BY PRODUCT
const getBatchesByProduct = async (productId) => {
  const [rows] = await pool.query(
    `SELECT * FROM Batches WHERE product_id = ?`,
    [productId]
  );
  return rows;
};

// GET BY ID
const getBatchById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * FROM Batches WHERE batch_id = ?`,
    [id]
  );
  return rows[0];
};

// 🔥 VERIFY
const verifyBatch = async (id) => {
  await pool.query(
    `UPDATE Batches SET status = 'Verified' WHERE batch_id = ?`,
    [id]
  );
};

module.exports = {
  createBatch,
  getAllBatches,
  getBatchesByProduct,
  getBatchById,
  verifyBatch, // ✅ added
};