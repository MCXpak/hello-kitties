const express = require('express');
const cors = require('cors');

const fetchBreeds = require('./fetchBreeds');
//let breeds;
let breedMatches;
// breedsArray = [];
let savedPets = [];

async function matching(quizData,res) {
    let matches = [];
    let breedsArray;
    let breeds = await fetchBreeds.getData();
    //console.log(breeds);
    for (let key in quizData){
        console.log(key)
        let match = filterByKey(key, quizData[key], breeds);
        matches.push(match);
    }
    
    matches = matches.flat();
    console.log(matches.length);
    breedsArray = fetchBreeds.sortBreedPop(matches,res);
    return breedsArray;
}

function filterByKey(key, keyValue, breeds) {
    let matchesBreeds = [];
    for (let breed of breeds){
        //console.log(breed)
        if (breed[`${key}`] >= keyValue){
            //console.log('I am in 2')
            matchesBreeds.push(breed.name);
        }
    }
    return matchesBreeds;
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

//All pets route

app.get('/cats/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        //console.log(id);

        if (isNaN(id)) {
            throw "Invalid input!"
        } else if (id < 0 || id >= pets.length) {
            throw "no such cat!"
        }
        //console.log(id);
        const filtered = pets.filter(cat => cat.id == id);
        res.send(filtered[0]);
    } catch (e) {
        res.status(400).send({ error: e})
    }
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

app.put('/matching', async (req, res) => {
    breedMatches = [];
    const quizData = req.body;
    breedMatches = await matching(quizData, res);
    //let response = breedMatches.json();
    console.log('I am finished')
    //console.log(breedMatches)
    //console.log(response)
    res.send('Hello')
})

app.get('/tinder', (req, res) => {
    let catTinderMatches = [];
    for (let breed of breedMatches){
        for (let cat of pets){
            if (cat.breed === breed.breedName){
                console.log('Match')
                catTinderMatches.push(cat);
            }
        }
    }
    res.send(catTinderMatches);
})

app.get('/saved', (req,res) => {
    res.send(savedPets)
})

app.post('/saved', (req, res) => {
    const savedCats = req.body;
    savedPets.push(savedCats)
    res.status(200).send(savedCats)
})

module.exports = app;
