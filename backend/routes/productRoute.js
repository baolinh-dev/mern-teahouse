const express = require('express');
const {
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    deleteReview,
    getProductReviews,
} = require('../controllers/productController');
const { isAuthenticatedUser, adminOnly } = require('../middleware/auth');
const router = express.Router();

// User
router.route('/products').get(getAllProduct);
router.route('/product/:id').get(getProductDetails);
router.route('/review').put(isAuthenticatedUser, createProductReview);  
router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser, deleteReview)
// Admin
router.route('/admin/product/new').post(isAuthenticatedUser, adminOnly, createProduct);
router
    .route('/admin/product/:id')
    .put(isAuthenticatedUser, adminOnly, updateProduct)
    .delete(isAuthenticatedUser, adminOnly, deleteProduct);

module.exports = router;
