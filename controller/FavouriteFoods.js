var rest = require('../Restclient');

exports.displayFavouriteFood = function getFavouriteFood(session, username){
    var url = 'https://foodbot124.azurewebsites.net/tables/FoodBot';
    rest.getFavouriteFood(url, session, username, handleFavouriteFoodResponse)
};

exports.sendFavouriteFood = function postFavouriteFood(session, username,favouriteFood){ 
    var url = 'https://foodbot124.azurewebsites.net/tables/FoodBot';
    rest.postFavouriteFood(url, username, favouriteFood)
};

function handleFavouriteFoodResponse(message, session, username) {
    var favouriteFoodResponse = JSON.parse(message);
    var allFoods = [];
    for (var index in favouriteFoodResponse) {
        var usernameReceived = favouriteFoodResponse[index].username;
        var favouriteFood = favouriteFoodResponse[index].favouriteFood;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(favouriteFoodResponse.length - 1) {
                allFoods.push(favouriteFood);
            }
            else {
                allFoods.push(favouriteFood + ', ');
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your favourite foods are: %s", username, allFoods);                
    
}

exports.deleteFavouriteFood = function deleteFavouriteFood(session,username,favouriteFood){ 
    var url  = 'https://foodbot124.azurewebsites.net/tables/FoodBot';


    rest.getFavouriteFood(url,session, username,function(message,session,username){ //Callback function
     var   allFoods = JSON.parse(message); //Parse result as JSON

        for(var i in allFoods) { //Iterate through favourite foods

            //Check if favourite food and username match
            if (allFoods[i].favouriteFood === favouriteFood && allFoods[i].username === username) {

                console.log(allFoods[i]);
                
                //Delete the favourite food
                rest.deleteFavouriteFood(url,session,username,favouriteFood, allFoods[i].id ,handleDeletedFoodResponse)

            }
        }


    });


};

function handleDeletedFoodResponse(body,session,username,favouritefood){
    console.log('Done');
}