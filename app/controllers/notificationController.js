import Notification from '../models/Notification.js';

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.userId }).populate('fromUser', 'username profilePic').populate('post', 'content').sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification || notification.user.toString() !== req.user.userId) {
      return res.status(404).json({ error: 'Notification not found or unauthorized' });
    }
    notification.read = true;
    await notification.save();
    res.json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getNotifications, markAsRead };
