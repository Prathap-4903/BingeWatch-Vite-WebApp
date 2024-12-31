import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { Auth } from './routes/auth/auth.js';
import { uuid } from './function/uuid.js';
import { userApi } from './routes/user/user.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { createServer } from 'http';
dotenv.config();

//Backend Configuration
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
        methods: ['GET', 'POST']
    }
});
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST']
}));

//File Access Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

//API
// app.get('/', (req, res) => res.send("Welcome To BingeWatch Watch Party - The Server Side of BingeWatch"));
app.post('/', (req, res) => res.send("Happy New Year Homies!"));
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

//Socket.io
io.on('connection', (socket) => {
    console.log(`New User Connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

//Backend Server
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server is Running on Port: ${port}`);
});
