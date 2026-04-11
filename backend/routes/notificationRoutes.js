const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// ⚠️ ORDER MATTERS
router.put('/read/:id', notificationController.markAsRead);
router.post('/', notificationController.createNotification);
router.get('/:userId', notificationController.getNotifications);

module.exports = router;