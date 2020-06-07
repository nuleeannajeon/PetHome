// PetFinderAPI Request

// ******* New Dog Search Test *******
const pfAPI = new petfinder.Client({apiKey: "cb58oTV1HT1nHEGfDGeG9cJSxuW9OYdr4tFtullZNR8RPZDPcd", secret: "XgbRAAfgLmZGVKZE0Gj1GtDZMmqu39LFlNLdBrtA"});

let apiResult, searchBreed;

async function main(){
  // -- GET BREED LIST --
  
  apiResult = await pfAPI.animalData.breeds('dog')
  console.log( `> ${apiResult.data.breeds.length} breeds found...` )
  apiResult.data.breeds.forEach( function( breed ){
    console.log( ` - ${breed.name}` )
  } );

  // -- SHOW DOGS (of breed) --
  searchBreed = document.querySelector('#searchDogAdopt').value;
  console.log( `> looking for dogs of breed: ${searchBreed}:` )

  document.querySelector('#dogBox').innerHTML = ""

  let page = 1, firstPage = true
  do {
    apiResult = await pfAPI.animal.search({
      type: "Dog", 
      breed: searchBreed, page, limit: 100} );

    if( firstPage ){
      console.log( 
        `=================================================\n`+
        `.. got ${apiResult.data.animals.length} dawgs (total pages: ${apiResult.data.pagination ? apiResult.data.pagination.total_pages : '-' })`+
        `=================================================\n`, apiResult )
      firstPage = false;
    } else {
      console.log( ` .. got ${apiResult.data.animals.length} dawgs` )
    }
    
    let dogIdx = (page-1)*100;
    apiResult.data.animals.forEach( function( animal ){
      console.log( ` -- ${++dogIdx}: ${animal.name} id: ${animal.id} url: ${animal.url}` )
      const dogPhoto = !animal.primary_photo_cropped ? 
        'https://img0.etsystatic.com/183/0/13221305/il_570xN.1214786404_1lgc.jpg' :
        (animal.primary_photo_cropped.length ? animal.primary_photo_cropped[0].small : animal.primary_photo_cropped.small)
        
      document.querySelector('#dogBox').innerHTML += `
        <div class="col-sm-12 col-md-4">
            <div class="card">
                <img src="${ apiResult.data.animals[dogIdx].photos.length>0 ? apiResult.data.animals[dogIdx].photos[0].medium : noImg }" style="height: 350px; width: 100%;"/>
                ${apiResult.data.animals[dogIdx].name ? `<br><div style="background-color: #ff9933; padding: 5px 0px"><strong>${apiResult.data.animals[dogIdx].name}</strong></div>` : ``}
                ${apiResult.data.animals[dogIdx].breeds.primary ? `<br>Breed: ${apiResult.data.animals[dogIdx].breeds.primary}` : ``}
                ${apiResult.data.animals[dogIdx].colors.primary ? `<br>Colors: ${apiResult.data.animals[dogIdx].colors.primary}` : ``}
                ${apiResult.data.animals[dogIdx].age ? `<br>Age: ${apiResult.data.animals[dogIdx].age}` : ``}
                ${apiResult.data.animals[dogIdx].gender ? `<br>Gender: ${apiResult.data.animals[dogIdx].gender}` : ``}
                ${apiResult.data.animals[dogIdx].contact.email ? `<br>Email: ${apiResult.data.animals[dogIdx].contact.email}` : ``}
                ${apiResult.data.animals[dogIdx].contact.phone ? `<br>Phone: ${apiResult.data.animals[dogIdx].contact.phone}` : ``}
                <br>
                <br>
                <div class="container">
                    <a href="${animal.url}" class="btn btn-outline-secondary">See ${apiResult.data.animals[dogIdx].name}</a>
                </div>
            </div>
        </div>
      `
    })
    // get next page
    page++

  } while( apiResult.data.pagination && apiResult.data.pagination.total_pages >= page )
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
                    <br>
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

// Function to find a picture based on ID of dog breed HELLO SOMEONE LET ME IN ZOOM!
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