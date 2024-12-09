import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { Auth } from './routes/auth/auth.js';
import { uuid } from './function/uuid.js';
import dotenv from 'dotenv';
dotenv.config()

//Backend Configuration
const app = express();
app.use(express.json());
app.use(cors({
    origin: [process.env.CORS_URL],
    credentials: true
}));
app.use(cookieParser());
//app.use('/uploads', express.static(path.join(__dirname, './uploads')));

//API
app.get("/", (req, res) => res.send("Welcome To BingeWatch Watch Party - The Server Side of BingeWatch"));
app.use("/auth", Auth);
app.get("/host", uuid);

//MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB - binge_watch");
})
.catch((err) => {
    console.log("Error Connecting MongoDB: ", err);
})

//Backend Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is Running on Port: ${port}`);
});