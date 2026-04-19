const { verifyToken } = require('../utils/helpers');

const authMiddleware = (req, res, next) => {
  try {
    // Handle different header cases safely
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Debug (optional — remove later)
    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: 'Access denied. No token provided.',
      });
    }

    // Ensure correct format
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Invalid token format',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'Token missing after Bearer',
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    req.user = {
      user_id: decoded.user_id,
      email: decoded.email,
      role_id: decoded.role_id,
    };

    next();
  } catch (error) {
    console.error('Auth error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token expired. Please login again.',
      });
    }

    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};

module.exports = authMiddleware;