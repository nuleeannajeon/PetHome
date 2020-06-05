// PetFinderAPI   ** HELP NEEDED **
var pf = new petfinder.Client({
    apiKey: "cb58oTV1HT1nHEGfDGeG9cJSxuW9OYdr4tFtullZNR8RPZDPcd", 
    secret: "XgbRAAfgLmZGVKZE0Gj1GtDZMmqu39LFlNLdBrtA"});

var dogData

pf.animal.search({type: "Dog"})
    .then(function(response) {
    dogData = response;
    console.log(dogData);
    displayDog(dogData);          
    });

// Displays/Appends PetFinderAPI Results
function displayDog(dogData) {

    for (var i = 0; i < dogData.data.animals.length; i++) {
        var noImg ="https://www.mcctoronto.com/wp-content/uploads/images/no-profile-picture-icon-15.png";
       
        document.querySelector('#dogBox').innerHTML += 
        `
        <div class="col-sm-12 col-md-4">
            <div class="card">
                <img src="${ dogData.data.animals[i].photos.length>0 ? dogData.data.animals[i].photos[0].medium : noImg }" />
                <br><strong>Name: ${dogData.data.animals[i].name}</strong>
                <br>Breed: ${dogData.data.animals[i].breeds.primary}
                <br>Colors: ${dogData.data.animals[i].colors.primary}
                <br>Age: ${dogData.data.animals[i].age}
                <br>Gender: ${dogData.data.animals[i].gender}
                <br>Description: ${dogData.data.animals[i].description}
                <br>email: ${dogData.data.animals[i].contact.email} <br>phone: ${dogData.data.animals[i].contact.phone}
            </div>
        </div>
        `
    }

}


// TheDogAPI Request
var dogfact
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", "9bb94a77-e337-4cde-89fb-4a1f6079701e")

var formdata = new FormData();

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.thedogapi.com/v1/breeds", requestOptions)
  .then(response => response.json())
  .then(function (result){
      dogfact = result;
      console.log(dogfact);
      displayDogFact(dogfact);
  })
  .catch(error => console.log('error', error));

// Display TheDogAPI Search
function displayDogFact(dogfact){
    var inputName = document.querySelector("#searchDogFacts").value;
    var lowerinputName = inputName.toLowerCase();
    
    document.querySelector('#dogFact').innerHTML = "";

    for (var i=0; i < dogfact.length ; i++){
        var dogName= dogfact[i].name;
        var lowerdogName = dogName.toLowerCase();

        if (lowerinputName == lowerdogName) {
            document.querySelector('#dogFact').innerHTML +=
            `
            <div class="col-md-6">
                <div class="card">
                
                    ${dogfact[i].name ? `<br>Name: ${dogfact[i].name}` : ``}
                    ${dogfact[i].origin ? `<br>Origin: ${dogfact[i].origin}` : ``}
                    ${dogfact[i].life_span ? `<br>Life-Span: ${dogfact[i].life_span}` : ``}
                    ${dogfact[i].height.metric ? `<br>Height: ${dogfact[i].height.metric}cm` : ``}
                    ${dogfact[i].weight.metric ? `<br>Weight: ${dogfact[i].weight.metric}kg` : ``}
                    ${dogfact[i].temperament ? `<br>Temperament: ${dogfact[i].temperament}` : ``}
                    ${dogfact[i].breeds_for ? `<br>Breed-For: ${dogfact[i].breeds_for}` : ``}
                
                </div>
            </div>
            `   
        }
    }
}