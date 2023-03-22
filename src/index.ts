"use strict";

console.log("//*************************** Node Ecommerce Backend ************************************//");

console.log("env: ", process.env.NODE_ENV.trim());

import * as fs from 'fs';
import * as config from "./config/index";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect');

dbConnect();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello People My Server is running");
});

// Start the server

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
