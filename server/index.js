// Packages
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
import { createServer } from 'http';
import { Server } from 'socket.io';
import SocketHandler from './SocketHandler.js';
dotenv.config();

//Backend Configuration
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: [process.env.FRONTEND_URL],
      methods: ['GET', 'POST'],
      credentials: true
    },
    timeout: 60000,
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

//Socket.io Configuration
SocketHandler(io);

// Server Configuration
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is Running on Port: ${port}`);
});