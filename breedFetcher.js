const request = require('request');
const breedInput = process.argv.slice(2)[0];

const urlSearch = 'https://api.thecatapi.com/v1/images/search?'; 
const urlSearchBreedsExt = 'breed_ids=';

const urlBreeds = 'https://api.thecatapi.com/v1/breeds';

  
request(urlBreeds, (error, response, body) => {  
  if(error) console.log(error); 
  if(response.statusCode !== 200) console.log(response.statusCode);

  const breedsArr = JSON.parse(body);
  const breedCodeRef = {};
  breedsArr.forEach(({ id, name }) => {
    breedCodeRef[id] = name;
  });  
  const breedCode = Object.keys(breedCodeRef).find(key => breedCodeRef[key] === breedInput);
  if(!breedCode) {
    console.log('No such breed!');
    return undefined;
  }

  const urlSearchBreed = urlSearch + urlSearchBreedsExt + breedCode;  
  request(urlSearchBreed, (error, response, body) => {
    if(error) console.log(error); 
    if(response.statusCode !== 200) console.log(response.statusCode);

    console.log(JSON.parse(body)[0].breeds[0].description);
  });
  
});  