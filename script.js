// PetFinderAPI Request
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
        var noImg ="https://www.stma.org/wp-content/uploads/2017/10/no-image-icon.png";
       
        document.querySelector('#dogBox').innerHTML += 
        `
        <div class="col-sm-12 col-md-4">
            <div class="card">
                <img src="${ dogData.data.animals[i].photos.length>0 ? dogData.data.animals[i].photos[0].medium : noImg }" style="height: 350px; width: 100%;"/>
                ${dogData.data.animals[i].name ? `<br><strong>${dogData.data.animals[i].name}</strong>` : ``}
                ${dogData.data.animals[i].breeds.primary ? `<br>Breed: ${dogData.data.animals[i].breeds.primary}` : ``}
                ${dogData.data.animals[i].colors.primary ? `<br>Colors: ${dogData.data.animals[i].colors.primary}` : ``}
                ${dogData.data.animals[i].age ? `<br>Age: ${dogData.data.animals[i].age}` : ``}
                ${dogData.data.animals[i].gender ? `<br>Gender: ${dogData.data.animals[i].gender}` : ``}
                ${dogData.data.animals[i].contact.email ? `<br>Email: ${dogData.data.animals[i].contact.email}` : ``}
                ${dogData.data.animals[i].contact.phone ? `<br>Phone: ${dogData.data.animals[i].contact.phone}` : ``}
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
        var picNum
        var dogPicture


        if (lowerinputName == lowerdogName) {
            picNum = dogfact[i].id;
            searchPicture(picNum)
            document.querySelector('#dogFact').innerHTML +=
            `
            <div class="row">
                <div class="col-sm-12 col-md-6">
                    <img id="dogFactsPic" src="" style="max-height: 400px; width:100%;"/>
                </div>
                <div class="col-sm-12 col-md-6" id="text" style="padding-top: 30px">
                    ${dogfact[i].name ? `<strong>${dogfact[i].name}</strong>` : ``}
                    ${dogfact[i].breed_group ? `<br>Breed-Group: ${dogfact[i].breed_group}` : ``}
                    ${dogfact[i].origin ? `<br>Origin: ${dogfact[i].origin}` : ``}
                    ${dogfact[i].life_span ? `<br>Life-Span: ${dogfact[i].life_span}` : ``}
                    ${dogfact[i].height.metric ? `<br>Height: ${dogfact[i].height.metric}cm` : ``}
                    ${dogfact[i].weight.metric ? `<br>Weight: ${dogfact[i].weight.metric}kg` : ``}
                    ${dogfact[i].temperament ? `<br>Temperament: ${dogfact[i].temperament}` : ``}
                    ${dogfact[i].bred_for ? `<br>Breed-For: ${dogfact[i].bred_for}` : ``}
                </div>
            </div>
            `   
        }
    }
}

// Function to find a picture based on ID of dog breed
async function searchPicture(picNum){
    console.log(`We are searching for your picture`)
    await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${picNum}`, requestOptions)
    .then(response => response.json())
    .then(function (result){
    dogPicture = result
    $("#dogFactsPic").attr("src", dogPicture[0].url)
    console.log(`We found a picture !`);
    })
    .catch(error => console.log('error', error));
}