var map;
var mainMap;

function initialize () {
  var madrid = {
      lat: 40.4380637,
      lng: -3.7497475
    };
  mainMap = new google.maps.Map(document.getElementById('map-main'), {
    center: madrid,
    scrollwheel: false,
    zoom: 6,
    styles: [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
  });
  setupAutocomplete();
}

function initMap(position, timestamp) {
  var mapId = timestamp || 'main';

  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map-{{ message.timestamp }}'), {
    center: position,
    scrollwheel: false,
    zoom: 16,
    styles: [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
  });

  // Create a marker and set its position.
  createMarker(position, map);
  console.log('map');
}

function createMarker(position, mapSelected) {
  var marker = new google.maps.Marker({
    position: position,
    map: mapSelected
  });
}

function setupAutocomplete() {
  var input = $('#search-places')[0];
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function(){
    var place = autocomplete.getPlace();
    if (place.geometry.location) {
      mainMap.setCenter(place.geometry.location);
      mainMap.setZoom(17);
      createMarker(place.geometry.location, mainMap);
    } else {
      alert("The place has no location...?")
    };
  });
}