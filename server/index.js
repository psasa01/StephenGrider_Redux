// Main starting point
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const router = require('./router');

// DB setup
mongoose.connect('mongodb://sallemao:sgrider@ds145438.mlab.com:45438/sgrider-server')

// App setup
app.use(morgan('combined')); // logging framework - used for debugging
app.use(bodyParser.json({ type: '*/*' })); // parsing incoming requests to json
router(app);


// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log(`Server listening on port ${port}`);