const ErrorHandler = require('../utils/errorHandler');

const User = require('../models/userModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const { use } = require('../routes/userRoute');

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, phoneNumber } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        phoneNumber,
        avatar: {
            public_id: 'this is a simple id',
            url: 'https://th.bing.com/th/id/R.b9838bf721d3dff150c954530b3856f3?rik=Uulm6lnhid2Giw&riu=http%3A%2F%2Fshackmanlab.org%2Fwp-content%2Fuploads%2F2013%2F07%2Fperson-placeholder.jpg&ehk=GGILj1W77t4L5TSfJq0peMYJY8na6RvFj0vx3uPQHkI%3D&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
        },
    });

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler('Please Enter Email & Password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    // Send the token to the client
    sendToken(user, 200, res);

    // Kiểm tra vai trò của người dùng
    if (user.role === 'user') {
        return res.redirect('/menu'); // Chuyển hướng đến tuyến admin nếu có vai trò admin
    } else if (user.role === 'admin') {
        return res.redirect('/');
    }
});
// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'Logged out',
    });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // ${req.get('host')}
    const resetPasswordUrl = `${req.protocol}://localhost:3000/api/v1/password/reset/${resetToken}`;

    const message = `Vui lòng đặt lại mật khẩu của bạn theo đường dẫn sau \n\n ${resetPasswordUrl} \n\nTrân trong !!!. \nTeaHouse.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recorvery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Creating token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorHandler('Reset password Token is invalid or has been expired', 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not password', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password dose not match', 400));
    }
    user.password = req.body.newPassword;

    await user.save();
    sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        'avatar.public_id': req.body.avatar.public_id,
        'avatar.url': req.body.avatar.url,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user,
    });
});

// Get All Users (admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = 4;
    const keyword = req.query.keyword;

    if (page === 'all') {
        // Trả về tất cả người dùng
        const query = keyword
            ? {
                  $or: [{ name: { $regex: keyword, $options: 'i' } }, { email: { $regex: keyword, $options: 'i' } }],
              }
            : {};

        const users = await User.find(query);

        res.status(200).json({
            success: true,
            users: users,
            totalUsers: users.length,
        });
    } else {
        const skip = (parseInt(page) - 1) * limit;

        let query = {};

        if (keyword) {
            query = {
                $or: [{ name: { $regex: keyword, $options: 'i' } }, { email: { $regex: keyword, $options: 'i' } }],
            };
        }

        const users = await User.find(query).skip(skip).limit(limit);
        const totalUsers = await User.countDocuments(query);
        const totalPages = Math.ceil(totalUsers / limit);

        res.status(200).json({
            success: true,
            users: users,
            totalPages: totalPages,
            totalUsers: totalUsers,
            currentPage: parseInt(page),
            numberUsersPerPage: limit,
        });
    }
});

// Get Single Users (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user,
    });
});

// Update User 
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber, 
        'avatar.public_id': req.body.avatar.public_id,
        'avatar.url': req.body.avatar.url,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user,
    });
}); 

// Create User 
exports.createUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email, 
      password: req.body.password,
      role: req.body.role,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber, 
      'avatar.public_id': req.body.avatar.public_id,
      'avatar.url': req.body.avatar.url,
    };
  
    const user = await User.create(newUserData);
  
    res.status(200).json({
      success: true,
      user,
    });
  });

// Delete User (Admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
    });
});
