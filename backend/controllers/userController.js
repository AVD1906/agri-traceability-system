const pool = require('../config/db');

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT user_id, name, email, role_id FROM Users`
    );

    res.json(rows);
  } catch (error) {
    console.error('getAllUsers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `SELECT user_id, name, email, role_id 
       FROM Users WHERE user_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('getUserById error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    await pool.query(
      `UPDATE Users SET name = ?, email = ? WHERE user_id = ?`,
      [name, email, id]
    );

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('updateUser error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// CHANGE ROLE
const changeRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_id } = req.body;

    await pool.query(
      `UPDATE Users SET role_id = ? WHERE user_id = ?`,
      [role_id, id]
    );

    res.json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('changeRole error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE USER (optional)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `DELETE FROM Users WHERE user_id = ?`,
      [id]
    );

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('deleteUser error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET USER AUDIT LOGS
const getUserAuditLogs = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `SELECT * FROM AuditLogs 
       WHERE user_id = ? 
       ORDER BY timestamp DESC`,
      [id]
    );

    res.json(rows);
  } catch (error) {
    console.error('getUserAuditLogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET ALL AUDIT LOGS
const getAllAuditLogs = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM AuditLogs ORDER BY timestamp DESC`
    );

    res.json(rows);
  } catch (error) {
    console.error('getAllAuditLogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  changeRole,
  deleteUser,
  getUserAuditLogs,
  getAllAuditLogs,
};