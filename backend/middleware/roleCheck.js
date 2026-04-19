const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role_id)) {
      return res.status(403).json({
        message: `Access denied. Required role(s): ${roles.join(', ')}`,
      });
    }

    next();
  };
};

// Define role IDs (adjust if needed)
const adminOnly = allowRoles(1);
const farmerOnly = allowRoles(2);
const anyRole = allowRoles(1, 2, 3, 4);

module.exports = { allowRoles, adminOnly, farmerOnly, anyRole };