import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { Auth } from './routes/auth/auth.js';

const app = express();
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"]
}))
app.use(cookieParser())
app.use("/auth", Auth)

mongoose.connect("mongodb://localhost:27017/binge_watch")
.then(() => {
    console.log("Connected to MongoDB - binge_watch")
})
.catch((err) => {
    console.log("Error Connecting MongoDB: ",err)
})


const port = 5000;
app.listen(port, () => {
    console.log(`Server is Running on Port: ${port}`);
})