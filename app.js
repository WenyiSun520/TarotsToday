import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
// connect redis to sessions
import session from "express-session";
// import Redis from "ioredis";
import connectRedis from "connect-redis";
const RedisStore = connectRedis(session);

//configure redis client
// let redisClient = new Redis();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBny8bIVb1JuM2jQWoom19ObDmwzRx91kM",
  authDomain: "tarotstoday.firebaseapp.com",
  projectId: "tarotstoday",
  storageBucket: "tarotstoday.appspot.com",
  messagingSenderId: "399951502589",
  appId: "1:399951502589:web:826d831e401bad1095f294"
};

// Initialize Firebase
const initializeFirebase = initializeApp(firebaseConfig);


import apiRouter from "./routes/api/api.js";

import models from "./models.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  req.models = models;
  next();
});
const oneDay = 1000 * 60 * 60 * 24;
// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: "this8is7a6secret5of4a5",
//     saveUninitialized: true,
//     cookie: { secure: false, httpOnly: false, maxAge: oneDay },
//     resave: false,
//   })
// );

app.use("/api", apiRouter);



export default app;
