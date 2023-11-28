const express = require('express');
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizerRoles, adminOnly} = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser); 
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
// Admin
router.route('/admin/users').get(isAuthenticatedUser, adminOnly, getAllUsers);
router.route('/admin/user/:id') 
    .get(isAuthenticatedUser, adminOnly, getSingleUser)
    .put(isAuthenticatedUser, adminOnly, updateUser)
    .delete(isAuthenticatedUser, adminOnly, deleteUser);
module.exports = router;
