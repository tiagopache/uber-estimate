var baseUrl = 'http://api.demo.sensedia.com/uber/v1/';
var applicationClientId = 'aZ8uN3rpCLbDFR2tsCtR8bd2OopzkARp';

var authorizationUrl = 'https://login.uber.com/';
var authotizationEndpoint = authorizationUrl + 'oauth/v2/authorize';
var tokenEndpoint = authorizationUrl + 'oauth/v2/token';
var priceEstimateEndpoint = baseUrl + 'estimates/price';



    // 1 step authorize

     function authorize(){
        $.ajax({
            type: 'GET',
            crossDomain: true,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/x-www-form-urlencoded' },
            url: authotizationEndpoint + '?client_id=' + applicationClientId + '&response_type=code',
            data: null,
            success: function (response) {
                $('#response').text(JSON.stringify(response));
            }
        });
    }

     function estimatePrice(origin, destiny) {
        $.ajax({
            type: 'GET',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'pt_BR'
            },
            url: priceEstimateEndpoint,
            data: {
                start_latitude: origin.lat,
                start_longitude: origin.lng,
                end_latitude: destiny.lat,
                end_longitude: destiny.lng
            },
            success: function (response) {
                var $btn = $('#estimate');
                
                $('#response').html('');

                for (var i = 0; i < response.prices.length; i++) {
                    var price = response.prices[i];

                    $('#response').append(controls.getEstimativeCard(price.localized_display_name, price.estimate, price.surge_multiplier)).fadeIn('slow');
                }
                
                $('#lblPrecos').toggle('slow');
                $('#lblDistancia').addClass('pull-right').text('Distância: ' + response.prices[0].distance).toggle('slow');
                $('#divEstimate').toggle('slow');
                
                $btn.button('reset');
            }
        });
    }

