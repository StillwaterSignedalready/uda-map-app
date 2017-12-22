
const 
	locations = [],
	places = {};

const ViewModel = {

	renderMarkers: function(locations){
		for(let i = 0, len = locations.length; i < len; i++){
			let position = locations[i].location;

			let marker = new google.maps.Marker({
				position: position
			});
			
			marker.setMap(window.map);
		}
	},

    createMarkersForPlaces: function(places) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < places.length; i++) {
          var place = places[i];
          var icon = {
            url: place.icon,
            size: new google.maps.Size(35, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location,
            id: place.place_id
          });
          var placeInfoWindow = new google.maps.InfoWindow();
          // If a marker is clicked, do a place details search on it in the next function.
          marker.addListener('click', function() {
            console.log('!');
            if (placeInfoWindow.marker == this) {
                console.log("This infowindow already is on this marker!");
            } else {
                getPlacesDetails(this, placeInfoWindow);
            }
          });
          // placeMarkers.push(marker);
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        }
        map.fitBounds(bounds);
    }

}

ko.applyBindings(ViewModel);

// functions ======================================		
function initMap(){
	
	window.map = new google.maps.Map(document.getElementById('map'),{
		center:{lat: 31.1233822,lng: 121.2827777},
		zoom: 10,
		mapTypeControl: false
	});


	window.map.addListener('tilesloaded', function(){
		new Promise(function(resolve, reject){
			searchPlaces('pizza', resolve);
		}).then(function(places){
			ViewModel.createMarkersForPlaces(places);
		});
		new Promise(function(resolve, reject){
			searchPlaces('school', resolve);
		}).then(function(places){
			ViewModel.createMarkersForPlaces(places);
		});

		google.maps.event.clearInstanceListeners(window.map);
	});

	function searchPlaces(query, resolve){
		let placesService = new google.maps.places.PlacesService(map),
			bounds = map.getBounds();

		placesService.textSearch({
			query: query,
			bounds: bounds
		}, function(results, status){
			if(status === google.maps.places.PlacesServiceStatus.OK){
				places[query] = [];
				places[query].push(...results);
				if(resolve instanceof Function){
					resolve(places[query]);
				}
			}
		});
	}

}