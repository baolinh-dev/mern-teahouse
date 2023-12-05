const express = require('express');
const {
    getAllNews,
    editNews,
    deleteNews,
    createNews,
    getNewsDetail,
} = require('../controllers/newsController');
const { isAuthenticatedUser, adminOnly } = require('../middleware/auth');
const router = express.Router();

// User
router.route('/news').get(isAuthenticatedUser, getAllNews);
router.route('/news').post(isAuthenticatedUser, adminOnly, createNews);
router
    .route('/news/:id')
    .get(isAuthenticatedUser, adminOnly, getNewsDetail)
    .delete(isAuthenticatedUser, adminOnly, deleteNews)
    .put(isAuthenticatedUser, adminOnly, editNews);

module.exports = router;