var pf = new petfinder.Client({
    apiKey: "cb58oTV1HT1nHEGfDGeG9cJSxuW9OYdr4tFtullZNR8RPZDPcd", 
    secret: "XgbRAAfgLmZGVKZE0Gj1GtDZMmqu39LFlNLdBrtA"});

var dogData

pf.animal.search({type: "Dog"})
    .then(function(response) {
    dogData = response;
    console.log(dogData);
    findDog(dogData);          
    });

function findDog(dogData) {
    var box = $("#dogBox");
    box.empty();
    count = 1;

    for (var i = 0; i < dogData.data.animals.length; i++) {
        var dogInfoBox = $('<div class="col-sm-12 col-md-auto col-lg-0" id="days">');
        var dogImg = $('<img>')
        var dogName = $('<h6>');
        var dogBreeds = $('<h6>');
        var dogColor = $('<h6>');
        var dogAge = $('<h6>');
        var dogDesc = $('<h6>');

        var noImg ="https://www.mcctoronto.com/wp-content/uploads/images/no-profile-picture-icon-15.png";
        var imgURL = dogData.data.animals[i].photos[0];
        
        if (imgURL) {
            dogImg.attr("src", imgURL.medium)
        } else {
            dogImg.attr("src", noImg);
        }

        dogName.text("Name: " + dogData.data.animals[i].name);
        dogBreeds.text("Breed: " + dogData.data.animals[i].breeds.primary);
        dogColor.text("Colors: " + dogData.data.animals[i].colors.primary);
        dogAge.text("Age: " + dogData.data.animals[i].age);
        dogDesc.text("Description: " + dogData.data.animals[i].description);
        dogInfoBox.append(dogImg, dogName, dogBreeds, dogColor, dogAge, dogDesc);
        box.append(dogInfoBox);
        count++;
        
    }
}