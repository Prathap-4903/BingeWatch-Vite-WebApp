import express from "express";
import { v4 } from "uuid";

const uuid = express.Router();

uuid.get("/host", (req, res) => {
    res.send(v4())
})

export { uuid }