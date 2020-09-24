const request = require('request');


const urlSearch = 'https://api.thecatapi.com/v1/images/search?';
const urlSearchBreedsExt = 'breed_ids=';

const urlBreeds = 'https://api.thecatapi.com/v1/breeds';

const fetchBreedDescription = function(breedName, callback) {
  request(urlBreeds, (error, response, body) => {
    if (error) callback(error, null);

    /* create breeds reference object */
    const breedsArr = JSON.parse(body);
    const breedCodeRef = {};
    breedsArr.forEach(({ id, name }) => {
      breedCodeRef[id] = name;
    });

    /* find the breed code to be used in url from reference object and input */
    const breedCode = Object.keys(breedCodeRef).find(key => breedCodeRef[key] === breedName);
    if (!breedCode) {
      callback('No such breed!', null);
    } else {
      /* create url to request from with breed code and breeds extension */
      const urlSearchBreed = urlSearch + urlSearchBreedsExt + breedCode;
      request(urlSearchBreed, (error, response, body) => {
        if (error) callback(error, null);
        else {
          callback(null, JSON.parse(body)[0].breeds[0].description.trim());
        }
      });
    }
  });
};

 
module.exports = { fetchBreedDescription };