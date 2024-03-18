const express = require('express');
const app = require('express')();
require('dotenv').config();
const { SERVER_PORT } = process.env;

const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const helmet = require("helmet");

//Routes
const usersRoute = require("./routes/userCRUD");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/postCRUD");
const feedbackRoute = require("./routes/feedbackCRUD");




//middlewares
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });



//use the routes
app.use("/api/user", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/feedback", feedbackRoute);


module.exports = app;