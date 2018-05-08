//Creating the Map
var map;
var information;
var marker;
var service;
var currentLocation = {lat: 52.19544 , lng: -2.22387};
//Check for geolocation data
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        information.open(map);
        map.setCenter(currentLocation);
        
    },
        function() {
            handleLocationError(true, information, map.getCenter());
        });
        } else {
            information.open(map);
            map.setCenter(currentLocation);
        // If the browser doesn't allow Geolocation
        handleLocationError(false, information, map.getCenter());
        } 
function initMap() {
    information = new google.maps.InfoWindow;
    
    map = new google.maps.Map(document.getElementById('map'), {
      center: currentLocation,
      zoom: 16
    }); 
    
    marker = new google.maps.Marker({
      position: currentLocation,
      map: map
    });
    
    var request = {
    location: currentLocation,
    radius: '300',
    query: 'pub'
    };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

    
}

function handleLocationError(browserHasGeolocation, information, currentLocation) {
    information.setPosition(currentLocation);
    information.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser does not allow geolocation.');
    information.open(map);
}
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
        console.log(place);
      createMarker(results[i]);
    }
  }
}
function createMarker(place){
    var placesList = document.getElementById("places");

    var marker = new google.maps.Marker({
        map: map,
        icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            strokeColor: 'blue',
            scale: 5
        },
        position: place.geometry.location 
    })
    var li = document.createElement('li');
          li.textContent = place.name;
          placesList.appendChild(li);
}