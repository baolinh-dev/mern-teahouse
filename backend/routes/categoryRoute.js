const express = require('express');
const {
    getAllCategories,
    editCategory,
    deleteCategory,
    createCategory,
    getDetailCategory,
} = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizerRoles, adminOnly } = require('../middleware/auth');
const router = express.Router();

// User
router.route('/categories').get(isAuthenticatedUser, getAllCategories);
router.route('/category').post(isAuthenticatedUser, adminOnly, createCategory);
router
    .route('/category/:id')
    .get(isAuthenticatedUser, adminOnly, getDetailCategory)
    .delete(isAuthenticatedUser, adminOnly, deleteCategory)
    .put(isAuthenticatedUser, adminOnly, editCategory);

module.exports = router;
