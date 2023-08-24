const express = require('express');
const router = express.Router();

const {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
} = require('../controllers/orderController');

const { isAuthenticatedUser, authorizerRoles, adminOnly } = require('../middleware/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/admin/orders').get(isAuthenticatedUser, adminOnly, getAllOrders);
router
    .route('/admin/order/:id')
    .get(isAuthenticatedUser, adminOnly, getSingleOrder)
    .put(isAuthenticatedUser, adminOnly, updateOrder)
    .delete(isAuthenticatedUser, adminOnly, deleteOrder);

module.exports = router;
