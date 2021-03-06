// Import dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');

// Import modules
const api = require('./src/api')();

// Construct express application
var app = express();

// Use bodyParser for json
app.use(bodyParser.json());

// Use Cross-Origin Resource Sharing
app.use(cors({credentials: true, origin: true}));

// Set header options
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Base URL for TradeSatoshi API
const baseURL = "https://tradesatoshi.com/api";

let textFile = {};
fs.readFile("src/help.txt", "utf8", function (err, data) {
    if (err) throw err;
    textFile['text'] = data;
});

// GETrequests, show help text
app.get('/', async (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(textFile['text']);
});

// POST requests
app.post('/', async (req, res) => {
    
    // Set options
    const options = {
        apiKey: req.body.apiKey,
        apiSecret: req.body.secret,
        baseURL: baseURL,
        path: req.body.method.toLowerCase()
    }

    // Feed api with request and send result back
    try {
        const result = await api[req.body.method](req.body.params, options);
        res.send(result);
    } catch (err) {
        res.send({error: err, message: 'Error connecting to TradeSatoshi, please check that your API key is correct.'});
    }
});

var port = process.env.PORT || 5000;

// Start express server
app.listen(port, 'localhost', function () {
    console.log("Server started");
});