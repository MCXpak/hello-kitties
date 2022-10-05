const express = require('express');
const cors = require('cors');

const fetchBreeds = require('./fetchBreeds');
let breeds;
let breedMatches = [];
let breedsArray;

async function matching(quizData,res) {
    breeds = await fetchBreeds.getData();
    for (let key in quizData){
        filterByKey(key, quizData[key], breeds);
    }
    breedsArray = fetchBreeds.sortBreeedPop(breedMatches,res)
}

function filterByKey(key, keyValue, breeds) {
    for (let breed of breeds){
        if (breed[`${key}`] >= keyValue){
            //console.log('I am in 2')
            breedMatches.push(breed.name);
        }
    }
}

const pets = require('./pets');
const logRoute = require('./logRoute');
//const matchFncs = require('./matching');

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

// Random cat route

app.get('/random', (req, res) => {
    const randIndex = Math.floor(Math.random()*pets.length)
    res.send(pets[randIndex]);
})

// Post route to add a new cat

app.post('/cats', (req, res) => {
    const newCat = req.body;
    pets.push(newCat);
    res.status(201).send(`This cat has been added:\n${newCat}`)
})

app.put('/matching', (req, res) => {
    breedMatches = [];
    const quizData = req.body;
    matching(quizData, res);
    console.log('I am finished')
    // console.log(breedMatches)
    res.send('Hello')
})

app.get('/tinder', (req, res) => {
    let catTinderMatches = [];
    for (let breed of breedsArray){
        for (let cat of pets){
            if (cat.breed === breed.breedName){
                catTinderMatches.push(cat);
            }
        }
    }
    res.send(catTinderMatches);
})

module.exports = app;
