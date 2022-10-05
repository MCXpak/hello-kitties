
async function matching(quizData, breeds) {
    let breedMatches = [];
    for (let key in quizData){
        breedMatches += filterByKey(key, quizData[key], breeds);
    }
    return breedMatches;
}

function filterByKey(key, keyValue, breeds) {
    const matches = [];
    for (let breed of breeds){
        if (breed[`${key}`] >= keyValue){
            
            matches.push(breed.name);
        }
    }
    return matches;
}





module.exports = {
    matching,
    filterByKey
}
