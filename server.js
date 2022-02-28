const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const { animals } = require('./data/animals.json')

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // NOte that we save the animalsArray as filtered results here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array
        // if personalityTraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal
            // Remember! This is initial a copy of the animalsArray
            // Here, we're updating it for each trait in the forEach() loop
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entires that contain that trait
            // so, at the end we'll have an array of animals with each one
            // of these traits
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API server now on port ${PORT}!`);
});