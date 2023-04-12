import express from 'express';
import cors from 'cors'
import session from "express-session";
import mongoose from "mongoose";
import {ParcelsController} from "./DBFunctions/parcels/parcels-controllers.js";
import { ShipGroupsController } from './DBFunctions/shipGroups/shipGroups-controllers.js';
import { PostController } from './DBFunctions/posts/posts-controllers.js';
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

// session
app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
    })
);

// app.use(cors());
app.use(
    cors({
        credentials: true,
        origin: [/^https:\/\/.*\.netlify\.app$/, "http://localhost:3000"],
    })
);


// -------------Controllers----------------
ParcelsController(app);
ShipGroupsController(app);
PostController(app);
UsersController(app);
AuthController(app);


app.listen(4000)
