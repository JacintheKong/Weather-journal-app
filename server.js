// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Use body-parser as middle-ware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`running on localhost: ${port}`)
})

// get a specific entry
app.get('/entry/:id', (req, res) => {
    res.send(projectData[req.params.id]);
});

// Get route
app.get('/all', sendData)

function sendData(req, res) {
    res.send(projectData)
};

// Post route
app.post('/add', callback);

function callback(req, res) {
    // add data to object
    const {body} = req;
    projectData[body.id] = body;
    // return most recent entry
    res.send(projectData[body.id]);
};