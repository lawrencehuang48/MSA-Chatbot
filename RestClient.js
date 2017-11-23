var request = require ('request');

exports.getFavouriteFood = function getData(url, session, username, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function handleGetResponse(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, username);
        }
    });
};

//Creating the REST call
exports.postFavouriteFood = function getData(url, username, favouriteFood){ //Sending data to server via the parameters
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',        //POSTMAN headers
            'Content-Type':'application/json'
        },
        json: {
            "username" : username,
            "favouriteFood" : favouriteFood
        }
      };
      
      request(options, function (error, response, body) {   //Parameters provided by request function
        if (!error && response.statusCode === 200) {        //Executing from response, 200 = OK
            console.log(body);
        }
        else{
            console.log(error);
        }
      });
};

exports.deleteFavouriteFood = function deleteData(url,session, username ,favouriteFood, id, callback){ 
    var options = {
        url: url + "\\" + id, //id tells function what to delete "\\" is syntax for escape sequence
        method: 'DELETE',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        }
    };

    request(options,function (err, res, body){ //blue function is callback function 
        if( !err && res.statusCode === 200){ //if ok log the body
            console.log(body);
            callback(body,session,username, favouriteFood);
        }else {                 //else log error to debug
            console.log(err); 
            console.log(res);
        }
    })

};

var request = require('request');

exports.getYelpData = function getData(url,bearer,session, callback){ //parameters

    request.get(url,{'auth': { 'bearer': bearer}} ,function(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body,session);
        }
    });
};

exports.getNutritionData = function getData(url, session, foodName, callback){ //url is endpoint
    
        request.get(url, function processGetRequest(err,res,body){ //Callback function
            if(err){
                console.log(err);
            }else {
                callback(body, foodName, session);
            }
        });
    };