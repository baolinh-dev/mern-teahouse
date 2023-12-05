const News = require('../models/newsModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.createNews = catchAsyncErrors(async (req, res, next) => {
    const news = await News.create(req.body);

    res.status(201).json({
        success: true,
        news,
    });
});

exports.getAllNews = catchAsyncErrors(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = 8;
    const keyword = req.query.keyword;

    if (page === 'all') {
        const query = keyword ? { title: { $regex: keyword, $options: 'i' } } : {};
        const news = await News.find(query);

        res.status(200).json({
            success: true,
            news: news,
            totalNews: news.length,
        });
    } else {
        const skip = (parseInt(page) - 1) * limit;

        let query = {};

        if (keyword) {
            query = { title: { $regex: keyword, $options: 'i' } };
        }

        const news = await News.find(query).skip(skip).limit(limit);
        const totalNews = await News.countDocuments(query);
        const totalPages = Math.ceil(totalNews / limit);

        res.status(200).json({
            success: true,
            news: news,
            totalPages: totalPages,
            totalNews: totalNews,
            currentPage: parseInt(page),
            numberNewsPerPage: limit,
        });
    }
});

exports.editNews = catchAsyncErrors(async (req, res, next) => {
    let news = await News.findById(req.params.id);

    if (!news) {
        return next(new ErrorHandler('News not found', 404));
    }

    news.title = req.body.title;
    news.imgUrl = req.body.imgUrl;
    news.blogUrl = req.body.blogUrl;

    await news.save();

    res.status(200).json({
        success: true,
        news,
    });
});

exports.deleteNews = catchAsyncErrors(async (req, res, next) => {
    const news = await News.findById(req.params.id);

    if (!news) {
        return next(new ErrorHandler('News not found', 404));
    }

    await news.deleteOne();

    res.status(200).json({
        success: true,
        message: 'News deleted successfully',
    });
});

exports.getNewsDetail = catchAsyncErrors(async (req, res, next) => {
    const news = await News.findById(req.params.id);

    if (!news) {
        return next(new ErrorHandler('News not found', 404));
    }

    res.status(200).json({
        success: true,
        news,
    });
});