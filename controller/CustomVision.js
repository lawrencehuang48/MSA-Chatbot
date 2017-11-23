var request = require('request'); //node module for http post requests

exports.retreiveMessage = function (session){

    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/f4777059-a48b-4ab0-b43f-d585c83e164e/url?iterationId=92c71ce9-4e94-4ced-a344-031e5939af17',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': 'e255f72dcb9b4f69917f05309ab246d2'
        },
        body: { 'Url': session.message.text }
    }, function(error, response, body){
        console.log(validResponse(body));
        session.send(validResponse(body));
    });
}

function validResponse(body){
    if (body && body.Predictions && body.Predictions[0].Tag){
        return "This is " + body.Predictions[0].Tag
    } else{
        console.log('Oops, please try again!');
    }
}