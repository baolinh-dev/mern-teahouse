const express = require('express');
const router = express.Router();

const { addNotification, deleteNotification, getAllNotifications  } = require('../controllers/notificationController');

router.route('/notis').get(getAllNotifications ); 
router.route('/noti/new').post(addNotification); 
router.route('/noti/:notificationId').delete(deleteNotification); 

module.exports = router;
