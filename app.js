import express from 'express';
import mongoose from "mongoose";

// mongo
const CONNECTION_STRING = process.env.SHIPSHARE_WEB_KEY
    || 'mongodb://localhost:27017/web-shipshare';
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(express.json());

app.listen(4000)