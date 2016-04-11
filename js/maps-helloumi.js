function initMap(latitude, longitude, timestamp) {
  var myLatLng = {lat: latitude, lng: longitude};

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'+timestamp), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 6,
    styles: [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
  });

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'me'
  });
}