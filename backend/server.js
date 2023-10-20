const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database'); 
const socketIo = require('socket.io');
// Handling Uncaught Exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`); 
    process.exit(1); // Kết thúc tiến trình với mã lỗi 1
  });
// Config
dotenv.config({ path: 'config/config.env' });

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});  
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A client connected');

    // Handle 'placeOrder' event from the user
    socket.on('placeOrder', (data) => {
        console.log('Order placed:', data.message);

        // Emit 'orderPlaced' event to the Admin clients
        io.emit('orderPlaced', { message: `${data.message}` });
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});
// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`); 
    server.close(() => { 
        process.exit(1); // Kết thúc tiến trình với mã lỗi 1
    })
});
