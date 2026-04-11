const pool = require('../config/db');

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const { product_name, category, farmer_id } = req.body;

    if (!product_name || !category || !farmer_id) {
      return res.status(400).json({ message: 'product_name, category, and farmer_id are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO Products (product_name, category, farmer_id) VALUES (?, ?, ?)',
      [product_name, category, farmer_id]
    );

    res.status(201).json({
      message: 'Product created successfully',
      product_id: result.insertId,
    });
  } catch (error) {
    console.error('createProduct error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, u.name AS farmer_name 
       FROM Products p 
       JOIN Users u ON p.farmer_id = u.user_id`
    );
    res.json(rows);
  } catch (error) {
    console.error('getAllProducts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT p.*, u.name AS farmer_name 
       FROM Products p 
       JOIN Users u ON p.farmer_id = u.user_id 
       WHERE p.product_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('getProductById error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createProduct, getAllProducts, getProductById };