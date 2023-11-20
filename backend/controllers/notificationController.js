const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Notification = require('../models/notificationModel');

exports.addNotification = catchAsyncErrors(async (req, res, next) => {
    const { date, content, authorName, typeNoti, authorAvatar } = req.body;

    // Tạo thông báo mới
    const notification = await Notification.create({
        authorName, 
        authorAvatar, 
        content,
        date,
        typeNoti,
    });

    res.status(201).json({ success: true, notification });
});

exports.deleteNotification = catchAsyncErrors(async (req, res, next) => {
    const { notificationId } = req.params;

    // Tìm thông báo theo ID và xóa nó
    const notification = await Notification.deleteOne({ _id: notificationId });
    if (notification.deletedCount === 0) {
        return res.status(404).json({ error: 'Thông báo không tồn tại.' });
    }

    res.status(200).json({ success: true, message: 'Thông báo đã được xóa.' });
});

exports.getAllNotifications = catchAsyncErrors(async (req, res, next) => {
    // Truy vấn tất cả thông báo
    const notifications = await Notification.find();

    res.status(200).json({ success: true, notifications });
});
