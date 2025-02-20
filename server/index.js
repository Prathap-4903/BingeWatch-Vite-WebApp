import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { Auth } from './routes/auth/auth.js';
import { uuid } from './function/uuid.js';
import { userApi } from './routes/user/user.js';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { createServer } from 'http';
dotenv.config();

//Backend Configuration
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_URL],
        methods: ['GET', 'POST'],
        credentials: true
    }
});
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(cookieParser());

//File Access Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

//API
app.get('/', (req, res) => res.send("Welcome To BingeWatch Watch Party - The Server Side of BingeWatch"));
app.use('/auth', Auth);
app.get('/host', uuid);
app.use('/user', userApi);

//MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB - binge_watch");
})
.catch((err) => {
    console.log("Error Connecting MongoDB: ", err);
})

//Variables
const rooms = new Map();
const users = new Map();

//Socket.io
io.on('connection', (socket) => {
    console.log('Client Connected -', socket.id);

    socket.on('set-username', (username) => {
        console.log(`${username} Connected With ID - ${socket.id}`);
    });

    socket.on('create-room', (roomId, username) => {
      if (rooms.has(roomId)) {
        socket.emit('create-room-response', false);
      } else {
        rooms.set(roomId, { host: username, participants: [] });
        console.log(rooms);
        socket.emit('create-room-response', true);
        socket.join(roomId);
        console.log(`Room ${roomId} created by ${username}`);
      }
    });

    socket.on('join-room', (roomId, username) => {
      if(!rooms.has(roomId)) {
        socket.emit('join-room-response', false);
      } else {
        console.log(`${username} requested to join room ${roomId}`);
        io.to(roomId).emit('join-request', { username, socketId: socket.id });
        socket.emit('join-room-pending'); // Inform the participant the request is sent
      }
    });

    socket.on('approve-join', ({ roomId, socketId, username }) => {
        if (rooms.has(roomId)) {
          // Add the participant to the room
          rooms.get(roomId).participants.push(username);
          console.log(rooms);
          // socket.join(roomId);
          io.sockets.sockets.get(socketId).join(roomId);
          console.log("Rooms -", io.sockets.adapter.rooms);
          io.to(socketId).emit('join-room-approved'); // Notify participant
          io.to(roomId).emit('users-in-room', rooms.get(roomId).participants);
          io.to(socketId).emit('users-in-room', rooms.get(roomId).participants); // Update room users
          io.to(socketId).emit('host-name', rooms.get(roomId).host); // Update host
        }
    });
    
    socket.on('reject-join', ({ socketId }) => {
      io.to(socketId).emit('join-room-rejected'); // Notify participant
    });

    // Update Users in Stream
    socket.on('get-host-name', (roomId) => {
      io.to(roomId).emit('host-name', rooms.get(roomId).host);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

//Backend Server
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is Running on Port: ${port}`);
});

// create-room
/*
io.to(roomId).emit('host-of-room', rooms.get(roomId).host);
if(!roomUsers.has(id)) {
roomUsers.set(id, []);
}
roomUsers.get(id).push(username);
console.log(roomUsers);
*/