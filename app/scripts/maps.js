// Google Maps API Key
var key = 'AIzaSyDs3SmMCGB-_AwVfWz7xseYBaeE93LWxHI';

var markers = [];
var origin = null;
var map = null;

var labels = 'AB';
var labelIndex = 0;

var directionsDisplay = null;
var directionsService = null;
var geoCoder = null;

function initMap(){
    origin = {lat: -25.363, lng: 131.044};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: origin
    });

    geoCoder = new google.maps.Geocoder();

    var infoWindow = new google.maps.InfoWindow({map: map});

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            origin = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(origin);
            infoWindow.setContent('Location found.');
            map.setCenter(origin);
        }, function(){
            handleLocationError(true, infoWindow, map.getCenter());
        })
    } else {
        // Browser doesn't support Geolocation
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
                document.getElementById('txtAddress').value = results[0].formatted_address;
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
    }
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

$(document).ready(function () {
    $('#estimate').on('click', estimate);
});


