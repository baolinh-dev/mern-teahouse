const ErrorHandler = require('../utils/errorhandler');

module.exports = (err, req, res, next) => {
    console.log(err.stack);

    // Wrong Mongodb Id error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT Error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Json Web Token is invalid, Try again';
        err = new ErrorHandler(message, 400);
    }  

    // JWT Expire Error  
    if (err.name === 'TokenExpiredError') {
        const message = 'Json Web Token is expired, Try again';
        err = new ErrorHandler(message, 400);
    }  

    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
