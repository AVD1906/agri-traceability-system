const notificationModel = require('../models/notificationModel');

// GET notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.getNotifications(req.params.userId);
    res.json(notifications);
  } catch (error) {
    console.error('getNotifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// MARK AS READ
exports.markAsRead = async (req, res) => {
  try {
    await notificationModel.markAsRead(req.params.id);
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('markAsRead error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE notification
exports.createNotification = async (req, res) => {
  try {
    const { user_id, message } = req.body;

    if (!user_id || !message) {
      return res.status(400).json({
        message: 'user_id and message required',
      });
    }

    await notificationModel.createNotification(user_id, message);

    res.status(201).json({
      message: 'Notification created',
    });
  } catch (error) {
    console.error('createNotification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};