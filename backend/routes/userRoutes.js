const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  changeRole,
  deleteUser,
  getUserAuditLogs,
  getAllAuditLogs,
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { body } = require('express-validator');
const { adminOnly, anyRole } = require('../middleware/roleCheck');

// Protect all routes
router.use(authMiddleware);

// GET
router.get('/', adminOnly, getAllUsers);
router.get('/audit-logs', adminOnly, getAllAuditLogs);
router.get('/:id/audit-logs', adminOnly, getUserAuditLogs);
router.get('/:id', anyRole, getUserById);

// UPDATE USER
router.put(
  '/:id',
  anyRole,
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Invalid email'),
  ],
  validateRequest,
  updateUser
);

// CHANGE ROLE
router.put(
  '/:id/role',
  adminOnly,
  [
    body('role_id')
      .isInt()
      .withMessage('role_id must be a number'),
  ],
  validateRequest,
  changeRole
);

// DELETE
router.delete('/:id', adminOnly, deleteUser);

module.exports = router;