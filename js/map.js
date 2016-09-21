
let map = {};

let initialMarkers = [
  {
    title: 'The Hackney Peddler',
    position: {lat: 51.5547, lng: -0.0669},
    spaces: 14,
    freeSpaces: 8,
    daysOpen: 'Mon-Sun',
    openingTimes: '07:00-19:00',
  },
  {
    title: 'BikeWorks',
    position: {lat: 51.5241, lng: -0.0548},
    spaces: 5,
    freeSpaces: 2,
    daysOpen: 'Mon-Sun',
    openingTimes: '08:00-20:00',
  },
  {
    title: 'London Fields Cycles',
    position: {lat: 51.5443, lng: -0.0581},
    spaces: 4,
    freeSpaces: 3,
    daysOpen: 'Mon-Sun',
    openingTimes: '08:00-21:00',
  }
];

let mobileMap = document.getElementById('mobile-map-div');

initialMarkers.map(function(marker) {
  let row = document.createElement('div');
  row.className = 'col-md-6';
  row.classList.add('mobile-map-element');
  let markerTitle = document.createElement('h3');
  markerTitle.className = 'h3';
  markerTitle.innerHTML = marker.title;
  let spacesTitle = document.createElement('h4');
  spacesTitle.className = 'h4';
  spacesTitle.innerHTML = 'Spaces Available';
  let spaces = document.createElement('p');
  spaces.innerHTML = marker.freeSpaces;
  let daysTitle = document.createElement('h4')
  daysTitle.innerHTML = 'Days Open';
  let days = document.createElement('p');
  days.innerHTML = marker.daysOpen;
  let timesTitle = document.createElement('h4');
  timesTitle.innerHTML = 'Opening Times';
  let times = document.createElement('p');
  times.innerHTML = marker.openingTimes;
  row.appendChild(markerTitle);
  row.appendChild(spacesTitle);
  row.appendChild(spaces);
  row.appendChild(daysTitle);
  row.appendChild(days);
  row.appendChild(timesTitle);
  row.appendChild(times);
  mobileMap.appendChild(row);
})

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
    center: {lat: 51.5386, lng: -0.0764},
    zoom: 13,
    mapTypeId: 'roadmap',
    scrollwheel: false
  });

  let renderedMarkers = initialMarkers.map((location) => {
    return new google.maps.Marker(
      Object.assign({}, location, {map: map})
    )
  })

  renderedMarkers.map((marker) => {
    marker.addListener('click', () => {
      let contentString = 
        `<div id="content">` + 
        `</div>` +
        `<div id="bodyContent">` +
        `<h1 id="firstHeading" class="panel-title" style="color:#ff9969">${marker.title}</h1>` +
        `<h1 class="panel-title"><small>Spaces available</small></h1>` +
        `<p>${marker.freeSpaces}</p>` +
        `<h1 class="panel-title"><small>You can park</small></h1>` +
        `<p class="opening-days">${marker.daysOpen}</p>` +
        `<p class="opening-times">${marker.openingTimes}</p>` +
        `<a class="button-link" href="#cycle">` +
        `<button type="button" class="btn bikestash-button" style="width: 100px">` + 
        `Book` +
        `</button>` +
        `</a>` +
        `</div>`;

      let infowindow = new google.maps.InfoWindow({
        content: contentString
      })

      infowindow.open(map, marker);

      let nameBox = document.getElementById('host-name');
      let freeSpaces = document.getElementById('spaces');
      nameBox.value = marker.title;
      freeSpaces.innerHTML = marker.freeSpaces;

      console.log(marker.title)
    })
  })

  // Create the search box
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);

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
      //Sets zoom level after search
      google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
        if (this.getZoom() > 14) {
          this.setZoom(14);
        }
      });
    });
    map.fitBounds(bounds);
  });
}

function submitSuggestion() {
  $('#suggest-text').css('display', 'none')
  $('#suggestion-tick').css('display', 'inline')
}

function resetSuggestionModal() {
  $('#suggest-text').css('display', 'inline')
  $('#suggestion-tick').css('display', 'none')
}


