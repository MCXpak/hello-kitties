const fetch = require('node-fetch');


const getData = async () =>{
    const options = {
        method: "GET",
        headers: {
            "x-api-key": "live_20NfnTBTiHHJCHU7c1iKXCxVzIDxPAnsMNQUdIDewrVKnxX9R0OkojRPtjgMwjWD"
        }
    }
    const res = await fetch("https://api.thecatapi.com/v1/breeds", options)
    const data = await res.json();
    //console.log(typeof data);
    return data;
}


function sortBreedPop(matches, res){
    let breedsArray = [];
    let count;
    let uniqueBreedMatches = [...new Set(matches)];
    for (let uniqueBreed of uniqueBreedMatches){
        count = 0;
        matches.forEach(breed => {
            if (breed === uniqueBreed){
                count++;
            }
        });
        breedsArray.push({breedName: `${uniqueBreed}`, count: `${count}`})
    }

    breedsArray.sort((a, b) => b.count - a.count)
    return breedsArray;
}

module.exports = {
    getData,
    sortBreedPop
}
