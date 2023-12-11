const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const http = require('http');
const socketio = require('socket.io');

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

const server = http.createServer(app);

const io = socketio(server);

global.onlineUsers = [];

io.on('connection', (socket) => {
    console.log(`A new client connected ${socket.id}`);

    // Handle events from the client
    socket.on('sendNotifications', (data) => {
        console.log(`Received data from ${socket.id} data: ${data}`);
        // Emit a response back to the client
        io.emit('response', data);
    });

    global.chatSocket = socket;

    socket.on('add-user', (userId) => {
        const existingUser = onlineUsers.find((user) => user.userId === userId);
        if (!existingUser) {
            onlineUsers.push({ userId, socketId: socket.id });
        }
        console.log('Online Users:', onlineUsers);
        io.emit('onlineUsers', onlineUsers);
    });

    socket.on('send-msg', (data) => {
        const sendUser = onlineUsers.find((user) => user.userId === data.to);
        const sendUserSocket = sendUser ? sendUser.socketId : null;
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.msg);  
            console.log("dã emit tới", sendUserSocket);
        } else {
            console.log("chưa dã emit tới"); 
            console.log(sendUserSocket);
            console.log(sendUser);
        }
        console.log('to: ', data.to, 'message: ', data.msg);
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1); // Kết thúc tiến trình với mã lỗi 1
    });
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
});
