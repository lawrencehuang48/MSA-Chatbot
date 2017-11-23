var rest = require('../RestClient');
var builder = require('botbuilder');

//Calls 'getYelpData' in RestClient.js with 'displayRestaurantCards' as callback to get list of restaurant information
exports.displayRestaurantCards = function getRestaurantData(foodName, location, session){
    var url ='https://api.yelp.com/v3/businesses/search?term='+foodName+'&location='+location + '&limit=5'; //limit = amount of searches, low = faster
    var auth ='7ACK2mOYusriZ4q70qIBtIW6vOF8m_BwF2mcKe4lBLv5tkqoc3-0HUbLkSLWKmMa0-b0czXYsPiYVwqINF1RYroVMRnlntM__dAuOHf_0boQVNemCSqatxD3aRIWWnYx';
    rest.getYelpData(url,auth,session,displayRestaurantCards);
}

function displayRestaurantCards(message, session) {
    var attachment = [];
    var restaurants = JSON.parse(message);
    
    //For each restaurant, add herocard with name, address, image and url in attachment
    for (var index in restaurants.businesses) {
        var restaurant = restaurants.businesses[index];
        var name = restaurant.name;
        var imageURL = restaurant.image_url;
        var url = restaurant.url;
        var address = restaurant.location.address1 + ", " + restaurant.location.city;

        var card = new builder.HeroCard(session) //Builds the card
            .title(name)
            .text(address)
            .images([
                builder.CardImage.create(session, imageURL)])
            .buttons([
                builder.CardAction.openUrl(session, url, 'More Information')
            ]);
        attachment.push(card); //push onto attachment array

    }

    //Displays restaurant hero card carousel in chat box 
    var message = new builder.Message(session) //create new message
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(attachment);
    session.send(message); //send the message
}

//Callback function returns to the original function to finish the rest of the code