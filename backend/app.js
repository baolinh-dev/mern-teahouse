const express = require('express');
const errorMiddleware = require('./middleware/error');
const cors = require('cors'); 

const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser()); 
app.use(cors()) 
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Route Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute'); 
const order = require('./routes/orderRoute');  
const notification = require('./routes/notificationRoute'); 

app.use('/api/v1', product);
app.use('/api/v1', user); 
app.use('/api/v1', order);  
app.use('/api/v1', notification); 

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
