const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  }, 
  authorAvatar: {
    type: String,
    required: true
  },
  typeNoti: {
    type: String,
    required: true
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;