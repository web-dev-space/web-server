import express from 'express';
import cors from 'cors'
import session from "express-session";
import mongoose from "mongoose";
import { ParcelsController } from "./DBFunctions/parcels/parcels-controllers.js";
import { ShipGroupsController } from './DBFunctions/shipGroups/shipGroups-controllers.js';
import { PostController } from './DBFunctions/posts/posts-controllers.js';
import { UsersController } from "./DBFunctions/users/users-controllers.js";
import { AuthController } from "./DBFunctions/users/auth-controller.js";
import { createProxyMiddleware } from 'http-proxy-middleware';
import {WarehouseController} from "./DBFunctions/warehouse/warehouse-controller.js";
import { v2 as cloudinary } from 'cloudinary';
import ImageController from "./DBFunctions/cloudinary/image-upload-controllers.js";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

// -------------Set Ups----------------
// link to mongoDB
const CONNECTION_STRING = process.env.SHIPSHARE_WEB_KEY
    || 'mongodb://localhost:27017/web-shipshare';
console.log(CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);


// Return "https" URLs by setting secure: true
cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// express & cors
const app = express();
app.use(express.json());

// session
app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true,
            sameSite: "none",
        },
    })
);

// app.use(cors());
app.use(
    cors({
        credentials: true,
        origin: [/^https:\/\/.*\.netlify\.app$/, "http://localhost:3000", "https://localhost:3000"],
    })
);

app.use('/tracking', createProxyMiddleware({
    target: 'https://api.tracktry.com',
    changeOrigin: true,
    pathRewrite: {
        '^/tracking': '/v1',
    },
}));


// -------------Controllers----------------
ParcelsController(app);
ShipGroupsController(app);
PostController(app);
UsersController(app);
AuthController(app);
WarehouseController(app);
ImageController(app);

app.listen(4000)
