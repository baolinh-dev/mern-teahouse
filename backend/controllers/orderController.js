const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Bạn cần đăng nhập để đặt hàng',
        });
    }

    // Lấy thông tin người dùng từ request
    const { cart, totalProductPrice, customerInfo, orderInfo } = req.body;
    const userId = req.user._id;

    // Tạo đơn hàng mới
    const order = await Order.create({
        user: userId,
        cart,
        totalProductPrice,
        customerInfo,
        orderInfo,
        dateOrder: (function () {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            return `${year}/${month}/${day}`;
        })(),
    });

    // Trả về đơn hàng vừa tạo
    res.status(201).json({
        success: true,
        order,
    });
});
// Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler('Order not found with this Id', 404));
    }

    res.status(201).json({
        success: true,
        order,
    });
});
// My Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });

    res.status(201).json({
        success: true,
        order,
    });
});
// Get All Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    // Kiểm tra xem tham số 'page' có được cung cấp và có giá trị là "all" không
    if (req.query.page && req.query.page.toLowerCase() === "all") {
        // Nếu 'page' là "all", lấy tất cả các đơn hàng
        try {
            const orders = await Order.find();

            res.status(200).json({
                success: true,
                orders,
                orderCount: orders.length
            });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách đơn hàng',
            });
        }
    } else {
        // Nếu 'page' không phải "all", thực hiện phân trang bình thường
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 3; // Số đơn hàng trên mỗi trang

        try {
            const totalOrders = await Order.countDocuments(); // Đếm tổng số đơn hàng
            const totalPages = Math.ceil(totalOrders / limit); // Tính tổng số trang

            let startIndex = 0;
            let endIndex = 0;
            if (page > 0 && page <= totalPages) {
                startIndex = (page - 1) * limit;
                endIndex = page * limit;
            }

            // Lấy danh sách đơn hàng theo trang
            const orders = await Order.find()
                .skip(startIndex)
                .limit(limit);

            res.status(200).json({
                success: true,
                orders,
                totalPages,
                currentPage: page, 
                numberOrdersPerPage: limit, 
                orderCount: totalOrders
            });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            res.status(500).json({
                success: false,
                message: 'Lỗi khi lấy danh sách đơn hàng',
            });
        }
    }
});

// Update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('Order not found with this Id', 404));
    }

    for (const item of order.cart) {
        await updateStock(item.id, item.quantity);
    }

    order.orderInfo.status = req.body.status;
    
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true,
    });
});
// Function
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}
// Delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('Order not found with this Id', 404));
    }

    await Order.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
    });
});
