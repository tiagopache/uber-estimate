// Google Maps API Key
var key = 'AIzaSyDs3SmMCGB-_AwVfWz7xseYBaeE93LWxHI';

var markers = [];
var origin = null;
var map = null;
var autocomplete = null;

var directionsDisplay = null;
var directionsService = null;
var geoCoder = null;
var infoWindow = null;

function initMap(){
    origin = {lat: -22.907566, lng: -43.180350};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: origin
    });

    geoCoder = new google.maps.Geocoder();

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('txtAddress')),
        {types: ['geocode']}
    );

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            origin = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var circle = new google.maps.Circle({
                center: origin,
                radius: position.coords.accuracy
            });
            
            autocomplete.setBounds(circle.getBounds());

            //infoWindow.setPosition(origin);
            //infoWindow.setContent('Location found.');
            map.setCenter(origin);
        }, function(){
            origin = {
                zoom: 12,
                lat: -22.907566,
                lng: -43.180350
            };

            var circle = new google.maps.Circle({
                center: origin,
                radius: position.coords.accuracy
            });
            
            autocomplete.setBounds(circle.getBounds());

            infoWindow = new google.maps.InfoWindow({map: map});
            handleLocationError(true, infoWindow, origin);
        })
    } else {
        // Browser doesn't support Geolocation
        infoWindow = new google.maps.InfoWindow({map: map});
        handleLocationError(false, infoWindow, map.getCenter());
    }

    google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng, map);
    });
}

function codeAddress() {
    var address = document.getElementById('txtAddress').value;
    geoCoder.geocode({ 'address': address}, function (results, status){
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            addMarker(results[0].geometry.location, map)
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    })
}

function codeLatLng(latLng) {
    geoCoder.geocode({'location': latLng}, function (results, status){
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(16);

                $('#addresses').append(controls.getAddressItem(markers.length - 1,results[0].formatted_address));
                
                if (markers.length === 1) {
                    $('#addresses').append(controls.getArrowDown());
                }
                
                $('#txtAddress').val('');
            } else {
                alert('No results found!');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    })
}

function addMarker(location, map) {
    var marker = new google.maps.Marker({
        position: location,
        draggable: true,
        animation: google.maps.Animation.DROP,
        map: map
    });

    codeLatLng(location);

    map.panTo(location);

    if (markers.length >= 2) {
        markers.pop();
    }

    markers.push(marker);

    if (markers.length === 2) {
        calculateAndDisplayRoute(markers[0].position, markers[1].position);
        $('#divSearch').toggle('slow');
        $('#divEstimate').toggle('slow');
    }
}

function removeMarker() {
    cleanResponse();

    clearMarkers();
    
    var id = $(this).prop('id');
    $('#arrow').fadeOut('slow', function () { $(this).remove(); });

    if (id === "1")
        markers.pop();
    else if (id === "0")
        markers.shift();
    
    if (markers.length < 2 && markers.length > 0) {
        $('#divSearch').toggle('slow');
        $('#divEstimate').fadeOut('slow');

        directionsDisplay.setMap(null);
    }
    showMarkers();
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 
                            'Error: The Geolocation service failed.' : 
                            'Error: Your browser doesn\'t support geolocation.');
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function showMarkers() {
    setMapOnAll(map);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function calculateAndDisplayRoute(_origin, _destiny) {
    directionsDisplay.setMap(map);

    directionsService.route({
        origin: _origin,
        destination: _destiny,//{placeId: placeId},
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });

    clearMarkers();
}

google.maps.event.addDomListener(window, 'load', initMap);

function estimate(){
    var $btn = $(this).button('loading');
    var origin = {
        lat: markers[0].position.lat(), 
        lng: markers[0].position.lng()
    };
    var destiny = {
        lat: markers[1].position.lat(), 
        lng: markers[1].position.lng()
    };

    estimatePrice(origin, destiny);
}


