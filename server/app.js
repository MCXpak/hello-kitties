const express = require('express');
const cors = require('cors');

const pets = require('./pets');
const logRoute = require('./logRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use(logRoute);

app.get('/', (req, res) => {
    res.send("Welcome to the Hello Kitties API")
})

//All pets route

app.get('/cats', (req, res) => {
    res.send(pets);
})





module.exports = app;
