const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { log } = require('console');

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'PLease Enter Your Name'],
        maxLength: [30, 'Name cannot exceed 30 characters'],
        minLength: [4, 'Name should have more than 4 characters'],
    }, 
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter a Valid Email'],
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minLength: [8, 'Password should be greater than 8 characters'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    role: {
        type: String,
        default: 'user',
    }, 
    phoneNumber: {
        type: Number,   
        default: null,
    }, 
    address: {
        type: String, 
        default: null,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Hashing password before save
userShema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare Password
userShema.methods.comparePassword = async function (enteredPassword) {  
    const isPasswordMatched = await bcrypt.compare(enteredPassword, this.password); 
    return isPasswordMatched;
}; 

// JWT Token
userShema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Generating Password Reset Token
userShema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hashing and adding resetPasswordToken to userShema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model('User', userShema);
