<<<<<<< HEAD
// var petData;

// PetFinder API
=======
>>>>>>> master
var pf = new petfinder.Client({
    apiKey: "cb58oTV1HT1nHEGfDGeG9cJSxuW9OYdr4tFtullZNR8RPZDPcd", 
    secret: "XgbRAAfgLmZGVKZE0Gj1GtDZMmqu39LFlNLdBrtA"});

<<<<<<< HEAD
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
=======
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
>>>>>>> master
