const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// 🔔 GET MY NOTIFICATIONS
router.get('/', authMiddleware, notificationController.getNotifications);

// ➕ CREATE NOTIFICATION
router.post('/', authMiddleware, notificationController.createNotification);

// ✅ MARK AS READ
router.put('/read/:id', authMiddleware, notificationController.markAsRead);

module.exports = router;