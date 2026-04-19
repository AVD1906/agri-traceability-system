const notificationModel = require('../models/notificationModel');


// ================= GET MY NOTIFICATIONS =================
exports.getNotifications = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const notifications = await notificationModel.getNotifications(user_id);

    res.json(notifications);

  } catch (error) {
    console.error('getNotifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// ================= MARK AS READ =================
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await notificationModel.markAsRead(id);

    res.json({ message: 'Notification marked as read' });

  } catch (error) {
    console.error('markAsRead error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// ================= CREATE NOTIFICATION =================
exports.createNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const user_id = req.user.user_id;

    if (!message) {
      return res.status(400).json({
        message: 'Message is required',
      });
    }

    await notificationModel.createNotification(user_id, message);

    res.status(201).json({
      message: 'Notification created successfully',
    });

  } catch (error) {
    console.error('createNotification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};