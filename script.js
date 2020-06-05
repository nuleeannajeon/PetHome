var dogData;
var dogtypeData;
var dogbreedData;

var pf = new petfinder.Client({
    apiKey: "cb58oTV1HT1nHEGfDGeG9cJSxuW9OYdr4tFtullZNR8RPZDPcd", 
    secret: "XgbRAAfgLmZGVKZE0Gj1GtDZMmqu39LFlNLdBrtA"});

    pf.animal.search()
        .then(function (response) {
            dogData = response
            displayAnimals(dogData);
        })
        .catch(function (error) {
            // Handle the error
            console.log(error)
        });
    
    pf.animalData.type('Dog')
        .then(function (response) {
            
            dogtypeData = response

        })
        .catch(function (error) {
            // Handle the error
            console.log(error)
        });
    
    pf.animalData.breeds('Dog')
        .then(function (response) {

            dogbreedData = response

        })
        .catch(function (error) {
            // Handle the error
            console.log(error)
        });

// function displayAnimals(dogData){
//     for (i=0; i<dogData.data.animals.length; i++){
//         if ( dogData.data.animals[i].age == "Baby" ){
//             document.querySelector('h2').textContent += dogData.data.animals[i].name; 
//         }
//     }
// }

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


  function displayDogFact(dogfact){
    var inputName = document.querySelector("#searchInput").value;
    var lowerinputName = inputName.toLowerCase();
    
    document.querySelector('#dogFact').innerHTML = " "

    for (var i=0; i < dogfact.length ; i++){
        var dogName = dogfact[i].name;
        var lowerdogName = dogName.toLowerCase();

        if (lowerinputName == lowerdogName) {
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



// function displayDogFact(dogfact){

//     for (var i=0; i < dogfact.length ; i++){

//         var searchedPet = document.querySelector('#searchedDog').value
        
//         console.log(searchedPet);

//         if (dogfact[i].name === searchedPet){

//             console.log(dogfact[i].origin)
//         }

        
//     }
// }