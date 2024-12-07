import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { Auth } from './routes/auth/auth.js';
import { uuid } from './function/uuid.js';
import dotenv from 'dotenv';
dotenv.config();

//Backend Configuration
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use('/uploads', expressStatic());

//API
app.use("/auth", Auth);
app.get("/host", uuid);

//MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB - binge_watch"))
.catch((err) => console.log("Error Connecting MongoDB: ", err))

//Running Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is Running on Port: ${port}`);
});
