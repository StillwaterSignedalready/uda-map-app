
const 
	locations = ko.observableArray([]),
	places = ko.observable({});

const view = {
	markers: []
};

const ViewModel = function(){

	const self = this;

	this.places = places;
	this.wholePiece = ko.observableArray([]);
	this.currentPiece = this.wholePiece;

	this.hideListings = function(){
        for(var i = 0; i < markers.length; i++){
            view.markers[i].setMap(null);
        } 
    };
	this.changeCurrentPiece = function(Piece){
		self.hideListings();
		self.createMarkersForPlaces(self.wholePiece())
	};
	this.showInfoForPlace = function(place){
		return 0;
	};
	// places is Array of places
    this.createMarkersForPlaces = function(places) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < places.length; i++) {
          var place = places[i];
          var icon = {
            url: place.icon,
            size: new google.maps.Size(45, 45),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 34),
            scaledSize: new google.maps.Size(35, 35)
          };
          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location,
            id: place.place_id
          });
          view.markers.push(marker);
          var placeInfoWindow = new google.maps.InfoWindow();
          // If a marker is clicked, do a place details search on it in the next function.
          marker.addListener('click', function() {
            if (placeInfoWindow.marker == this) {
                console.log("This infowindow already is on this marker!");
            } else {
                self.getPlacesDetails(this, placeInfoWindow);
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
    };
    this.getPlacesDetails = function(marker, infowindow) {
      var service = new google.maps.places.PlacesService(map);
      service.getDetails({
        placeId: marker.id
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Set the marker property on this infowindow so it isn't created again.
          infowindow.marker = marker;
          var innerHTML = '<div>';
          if (place.name) {
            innerHTML += '<strong>' + place.name + '</strong>';
          }
          if (place.formatted_address) {
            innerHTML += '<br>' + place.formatted_address;
          }
          if (place.formatted_phone_number) {
            innerHTML += '<br>' + place.formatted_phone_number;
          }
          if (place.opening_hours) {
            innerHTML += '<br><br><strong>Hours:</strong><br>' +
                place.opening_hours.weekday_text[0] + '<br>' +
                place.opening_hours.weekday_text[1] + '<br>' +
                place.opening_hours.weekday_text[2] + '<br>' +
                place.opening_hours.weekday_text[3] + '<br>' +
                place.opening_hours.weekday_text[4] + '<br>' +
                place.opening_hours.weekday_text[5] + '<br>' +
                place.opening_hours.weekday_text[6];
          }
          if (place.photos) {
            innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                {maxHeight: 100, maxWidth: 200}) + '">';
          }
          innerHTML += '</div>';
          infowindow.setContent(innerHTML);
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      });
    };

}

const vModel = new ViewModel();

// functions ======================================	
function initViewModel(){
	for(let prop in places()){
		const arr = places()[prop];
		// why ko array hasn't concat?!
		for(let i = 0, len = arr.length; i < len; i++){
			vModel.wholePiece.push(arr[i]);
		}
	}
	ko.applyBindings(vModel);
}

function initMap(){
	
	const styles = [
	    {
	        "featureType": "administrative",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "color": "#444444"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.neighborhood",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.neighborhood",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "weight": "1.99"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.neighborhood",
	        "elementType": "labels.text",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "color": "#f35c19"
	            },
	            {
	                "weight": "0.01"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "all",
	        "stylers": [
	            {
	                "color": "#f2f2f2"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "lightness": "0"
	            },
	            {
	                "saturation": "0"
	            },
	            {
	                "color": "#ffddc1"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "labels.text",
	        "stylers": [
	            {
	                "weight": "0.64"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "weight": "1"
	            },
	            {
	                "lightness": "63"
	            },
	            {
	                "color": "#fff5f0"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "color": "#ffad00"
	            },
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "poi.park",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "color": "#ffc3a0"
	            },
	            {
	                "lightness": "1"
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "road",
	        "elementType": "all",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 45
	            }
	        ]
	    },
	    {
	        "featureType": "road",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "color": "#fd7539"
	            },
	            {
	                "weight": "0.62"
	            },
	            {
	                "lightness": "53"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "labels.text",
	        "stylers": [
	            {
	                "visibility": "simplified"
	            },
	            {
	                "color": "#4e5757"
	            },
	            {
	                "weight": "0.01"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "weight": "0.01"
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "color": "#ffffff"
	            },
	            {
	                "visibility": "on"
	            },
	            {
	                "weight": "0.01"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "labels.icon",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway.controlled_access",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "labels.text",
	        "stylers": [
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "elementType": "labels.icon",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "elementType": "all",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "all",
	        "stylers": [
	            {
	                "color": "#c6e3ec"
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "color": "#cde1f0"
	            },
	            {
	                "lightness": "-3"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "weight": "0.25"
	            },
	            {
	                "color": "#888d8d"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "weight": "0.80"
	            }
	        ]
	    }
	];

	window.map = new google.maps.Map(document.getElementById('map'),{
		center:{lat: 31.1233822,lng: 121.2827777},
		zoom: 10,
		styles: styles,
		mapTypeControl: false
	});

	// setTimeout(function(){
	// 	console.log(styles);
	// } ,1000);

	window.map.addListener('tilesloaded', function(){
		const p1 = new Promise(function(resolve, reject){
			searchPlaces('pizza', resolve);
		}).then(function(places){
			vModel.createMarkersForPlaces(places);
		});
		const p2 = new Promise(function(resolve, reject){
			searchPlaces('school', resolve);
		}).then(function(places){
			vModel.createMarkersForPlaces(places);
		});

		p1.then(function(){
			return p2.then(__=> {initViewModel()});
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
				places()[query] = [];
				places()[query].push(...results);
				if(resolve instanceof Function){
					resolve(places()[query]);
				}
			}
		});
	}

}
