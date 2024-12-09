import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { Auth } from './routes/auth/auth.js';
import { uuid } from './function/uuid.js';
import dotenv from 'dotenv';
dotenv.config()

//API
const app = express();
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser())
// app.use("/", (req, res) => {
//     res.send("Welcome To BingeWatch Watch Party - This is The Server of BingeWatch")
// })
app.use("/auth", Auth)
app.get("/host", uuid)

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB - binge_watch");
})
.catch((err) => {
    console.log("Error Connecting MongoDB: ", err);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is Running on Port: ${port}`);
})