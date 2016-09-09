
let map = {};

let initialMarkers = [
  {
    title: 'The Hackney Peddlar',
    position: {lat: 51.5547, lng: -0.0691},
  }
];

function elementHasParentElement(element, id) {
  if (element.id === id) {
    return true;
  } else if (element.parentElement) {
    return elementHasParentElement(element.parentElement, id)
  } else {
    return false;
  }
}

function toggleScrollOnClickLocation(event) {
  if (elementHasParentElement(event.target ,'map')) {
    map.setOptions({ scrollwheel: true })
  } else {
    map.setOptions({ scrollwheel: false })
  }
}

function initAutocomplete() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.5201, lng: -0.0769},
    zoom: 13,
    mapTypeId: 'roadmap',
    scrollwheel: false
  });

  let renderedMarkers = initialMarkers.map((location) => {
    return new google.maps.Marker({
      position: location.position,
      map: map,
      title: location.title,
    })
  })

  renderedMarkers.map((marker) => {
    marker.addListener('click', () => {
      console.log(marker.title)
    })
  })

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
