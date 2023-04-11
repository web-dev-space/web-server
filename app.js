import express from 'express';
import mongoose from "mongoose";
import {ParcelsController} from "./DBFunctions/parcels/parcels-controllers.js";


// mongo
const CONNECTION_STRING = process.env.SHIPSHARE_WEB_KEY
    || 'mongodb://localhost:27017/web-shipshare';
mongoose.connect(CONNECTION_STRING);


// express
const app = express()
app.use(express.json());


// -------------controllers----------------
ParcelsController(app);


app.listen(4000)