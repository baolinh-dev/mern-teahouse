const userModel = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const jwt = require('jsonwebtoken');

const getTokenFromCookie = (req) => {
    return req.cookies.token;
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

const findUserById = async (id) => {
    return await userModel.findById(id);
};

exports.isAuthenticatedUser = async (req, res, next) => {
    const token = getTokenFromCookie(req) || req.cookies.token;
    if (!token) return next(new ErrorHandler('Please login to access this resource', 401));

    try {
        const decodedData = verifyToken(token);
        const user = await findUserById(decodedData.id);
        if (!user) return next(new ErrorHandler('User not found', 404));

        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorHandler('Invalid token, please login again', 401));
    }
};

exports.authorizerRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resouce`, 403));
        }
        next();
    };
};

exports.adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resouce`, 403));
    }
    next();
};
