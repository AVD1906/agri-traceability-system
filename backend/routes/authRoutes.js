const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getMe,
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { body } = require('express-validator');

// REGISTER
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  validateRequest,
  register
);

// LOGIN
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  login
);

// GET PROFILE
router.get('/me', authMiddleware, getMe);

module.exports = router;