var baseUrl = 'http://api.demo.sensedia.com/uber/v1/';
//b78YNVWafX1gWy3t68zVIp6QxPB87w#_
var applicationClientId = 'aZ8uN3rpCLbDFR2tsCtR8bd2OopzkARp';
var serverToken = '5ftzPACXLTuhEdq7Y3wP_al2OWuww47abCXK62jZ';

var authorizationUrl = 'https://login.uber.com/';
var authotizationEndpoint = authorizationUrl + 'oauth/v2/authorize';
var tokenEndpoint = authorizationUrl + 'oauth/v2/token';
var priceEstimateEndpoint = baseUrl + 'estimates/price';

// 1 step authorize

function authorize(){
    $.ajax({
        type: "GET",
        crossDomain: true,
        headers: { "Access-Control-Allow-Origin" : "*", "Content-Type" : "application/x-www-form-urlencoded" },
        url: authotizationEndpoint + '?client_id=' + applicationClientId + '&response_type=code',
        data: null,
        success: function (response) {
            $('#response').text(response);
        }
    });

    

    // $.get(
    //     authotizationEndpoint + '?client_id=' + applicationClientId + '&response_type=code', 
    //     function (data, textStatus, jqXHR) {
    //         $('#response').text(JSON.stringify(data));
    //     },
    //     "application/json"
    // );
}


function estimatePrice(origin, destiny) {
    $.ajax({
        type: "GET",
        crossDomain: true,
        headers: { 
                "Allow-Control-Allow-Origin" : "*", 
                "Content-Type" : "application/json",
                "Authorization" : "Token " + serverToken,
                "Accept-Language": "pt_BR"
            },
        url: priceEstimateEndpoint,
        data: {
            start_latitude: origin.lat,
            start_longitude: origin.lng,
            end_latitude: destiny.lat,
            end_longitude: destiny.lng
        },
        success: function (response) {
            $('#response').text(response);
        }
    });
}