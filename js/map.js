function initMap() {
    var startAddress = "Kabanbay Batyr St 320, Almaty";
    var endAddress = "Bts \"Bayzak\" Abay Ave 52в, Almaty";
  
    var geocoder = new google.maps.Geocoder();
  geocoder.geocode({address: startAddress}, function(results, status) {
    if (status === 'OK') {
      var startPoint = results[0].geometry.location;
      geocoder.geocode({address: endAddress}, function(results, status) {
        if (status === 'OK') {
          var endPoint = results[0].geometry.location;
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: startPoint,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          });

          var startMarker = new google.maps.Marker({
            position: startPoint,
            map: map,
            label: {
              text: "\ue57a",
              fontFamily: "Material Icons",
              color: "#ffffff",
              fontSize: "16px",
            },
          });

          var endMarker = new google.maps.Marker({
            position: endPoint,
            map: map,
            label: {
              text: "\ue88a",
              fontFamily: "Material Icons",
              color: "#ffffff",
              fontSize: "16px",
            },
          });

          var directionsService = new google.maps.DirectionsService();
          var directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 5
            }
          });

          var request = {
            origin: startPoint,
            destination: endPoint,
            travelMode: 'DRIVING'
          };

          directionsService.route(request, function(result, status) {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
            }
          });
        }
      });
    }
  });
}