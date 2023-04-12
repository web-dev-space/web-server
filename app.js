import express from 'express';
import cors from 'cors'
import mongoose from "mongoose";
import {ParcelsController} from "./DBFunctions/parcels/parcels-controllers.js";
import {UsersController} from "./DBFunctions/users/users-controllers.js";
import {AuthController} from "./DBFunctions/users/auth-controller.js";


// -------------Set Ups----------------
// link to mongoDB
const CONNECTION_STRING = process.env.SHIPSHARE_WEB_KEY
    || 'mongodb://localhost:27017/web-shipshare';
console.log(CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);


// express & cors
const app = express();
app.use(express.json());
app.use(cors());


// -------------Controllers----------------
ParcelsController(app);
UsersController(app);
AuthController(app);


app.listen(4000)