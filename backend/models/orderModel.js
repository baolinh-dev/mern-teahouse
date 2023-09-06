const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cart: [
        {
            image: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    totalProductPrice: {
        type: Number,
    },
    customerInfo: {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    orderInfo: {
        transport: {
            type: String,
            required: true,
            default: 'Delivery',
        },
        payment: {
            type: String,
            required: true,
            default: 'COD',
        },
        status: {
            type: String,
            required: true,
            default: 'Processing',
        },
    }, 
    dateOrder: {
        type: Date,
        default: Date.now,
    },
});

// Middleware để tính toán trường totalProductPrice
orderSchema.pre('save', function (next) {
    let totalCartPrice = 0;
    this.cart.forEach((product) => {
        totalCartPrice += product.quantity * product.price;
    });
    this.totalProductPrice = totalCartPrice;
    next();
});

module.exports = mongoose.model('Order', orderSchema);
