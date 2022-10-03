const pets = require('./pets');

const matching = (quizData) => {
    const catMatches = [];
    const catCount = [];
    for (let n of pets){
        catCount.push(0);
    }
    console.log(catCount);
    for (let key in quizData){
        switch (key) {
            case "age":
                for (let cat of pets){
                    if (cat.age < quizData[key]){
                        catCount[cat.id]++;
                    }
                }
            break;
        
            default:
                break;
        }
    }
    console.log(catCount);

}

const quizData = {
    age: 6
}

matching(quizData);

module.exports = matching;
