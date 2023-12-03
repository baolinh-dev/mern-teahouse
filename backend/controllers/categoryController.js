const Category = require('../models/categoryModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        category,
    });
});

exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = 8;
    const keyword = req.query.keyword;

    if (page === 'all') {
        const query = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};
        const categories = await Category.find(query);

        res.status(200).json({
            success: true,
            categories: categories,
            totalCategories: categories.length,
        });
    } else {
        const skip = (parseInt(page) - 1) * limit;

        let query = {};

        if (keyword) {
            query = { name: { $regex: keyword, $options: 'i' } };
        }

        const categories = await Category.find(query).skip(skip).limit(limit);
        const totalCategories = await Category.countDocuments(query);
        const totalPages = Math.ceil(totalCategories / limit);

        res.status(200).json({
            success: true,
            categories: categories,
            totalPages: totalPages,
            totalCategories: totalCategories,
            currentPage: parseInt(page),
            numberCategoriesPerPage: limit,
        });
    }
});

exports.editCategory = catchAsyncErrors(async (req, res, next) => {
    let category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }

    category.name = req.body.name;
    await category.save();

    res.status(200).json({
        success: true,
        category,
    });
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }

    await category.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Category deleted successfully',
    });
}); 

// Get Product Details
exports.getDetailCategory = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        category,
    });
});
