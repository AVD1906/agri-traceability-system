const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const batchRoutes = require('./routes/batchRoutes');
const logRoutes = require('./routes/logRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const reportRoutes = require('./routes/reportRoutes');
const locationRoutes = require('./routes/locationRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// ✅ NEW: error handlers
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'AgriTrace API is running' });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);

// ✅ MUST BE LAST (very important)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});