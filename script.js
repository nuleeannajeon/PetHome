// var petData;

// PetFinder API
var pf = new petfinder.Client({
    apiKey: "cb58oTV1HT1nHEGfDGeG9cJSxuW9OYdr4tFtullZNR8RPZDPcd", 
    secret: "XgbRAAfgLmZGVKZE0Gj1GtDZMmqu39LFlNLdBrtA"});

// pf.animal.search()
//     .then(function (response) {
//         // Do something with `response.data.animals`
//         petData = response
//     })
//     .catch(function (error) {
//         // Handle the error
//         console.log(error)
//     });

var dogData

pf.animal.search({type: "Dog"})
  .then(resp => {
    dogData = resp
});
