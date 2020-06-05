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

// function findDog(dogData) {
//     var box = $("#dogBox");
//     box.empty();

//     for (var i = 0; i < dogData.data.animals.length; i++) {

//         var dogInfoBox = $('<div class="col-sm-12 col-md-4">');
//         var dogImg = $('<img>')
//         var dogName = $('<h6>');
//         var dogBreeds = $('<h6>');
//         var dogColor = $('<h6>');
//         var dogAge = $('<h6>');
//         var dogDesc = $('<h6>');

//         var noImg ="https://www.mcctoronto.com/wp-content/uploads/images/no-profile-picture-icon-15.png";
//         var imgURL = dogData.data.animals[i].photos[0];
        
//         if (imgURL) {
//             dogImg.attr("src", imgURL.medium)
//         } else {
//             dogImg.attr("src", noImg);
//         }

//         dogInfoBox.css("padding", "5px");
//         dogName.text("Name: " + dogData.data.animals[i].name);
//         dogBreeds.text("Breed: " + dogData.data.animals[i].breeds.primary);
//         dogColor.text("Colors: " + dogData.data.animals[i].colors.primary);
//         dogAge.text("Age: " + dogData.data.animals[i].age);
//         dogDesc.text("Description: " + dogData.data.animals[i].description);
//         dogInfoBox.append(dogImg, dogName, dogBreeds, dogColor, dogAge, dogDesc);
//         box.append(dogInfoBox);
        
//     }
// }

function displayDog(dogData) {
    for (var i = 0; i < dogData.data.animals.length; i++) {
        var noImg ="https://www.mcctoronto.com/wp-content/uploads/images/no-profile-picture-icon-15.png";
       
        document.querySelector('#dogBox').innerHTML += 
        `
        <div class="col-sm-12 col-md-4">
            <div class="card">
                <img src="${ dogData.data.animals[i].photos.length>0 ? dogData.data.animals[i].photos[0].medium : noImg }" />
                <br>Name: ${dogData.data.animals[i].name}
                <br>Breed: ${dogData.data.animals[i].breeds.primary}
                <br>Colors: ${dogData.data.animals[i].colors.primary}
                <br>Age: ${dogData.data.animals[i].age}
                <br>Description: ${dogData.data.animals[i].description}
            </div>
        </div>
        `
  }

}



// The DogAPI
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

fetch("https://api.thedogapi.com/v1/breeds?name=Affenpinscher", requestOptions)
  .then(response => response.json())
  .then(function(response){
    dogfact = response;
    console.log(dogfact)
    })
  .catch(error => console.log('error', error));


function displayDogFact(dogfact){
    var inputName = document.querySelector("#searchInput").value
    var inputNameLower = inputName.toLowerCase(inputName)

    for (var i=0; i < dogfact.length ; i++){
        var dogName = dogfact[i].name
        var lowerDogName = dogName.toLowerCase(dogName)
        
        if (inputNameLower == lowerDogName) {
            document.querySelector('#dogFact').innerHTML +=
            `
            <div class="col-md-6">
                <div class="card">
                    <br>Name: ${dogfact[i].name}
                    <br>Origin: ${dogfact[i].origin}
                    <br>Life-span: ${dogfact[i].life_span}
                    <br>Bred-For: ${dogfact[i].breeds_for}
                </div>
            </div>
            `
        }
    }
}