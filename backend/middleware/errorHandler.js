const errorHandler = (err, req, res, next) => {
  console.error('🔴 ERROR:', err.stack || err.message);

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal server error',
  });
};

const notFound = (req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
};

module.exports = { errorHandler, notFound };