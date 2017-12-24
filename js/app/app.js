
const 
	locations = ko.observableArray([]),
	places = ko.observable({}),
	scale = 7,
	interests = ko.observableArray(['幼儿园','公园','大学']);

const view = {
	markers: {},
	bounds: {}
};

const ViewModel = function(){

	const self = this;

	this.places = places;
	this.keys = ko.observableArray(['all']);
	this.keyChosen = ko.observableArray(['all']);
	this.wholePiece = ko.observableArray([]);
	this.currentPiece = ko.observableArray(this.wholePiece());
	// this.currentMarkers = 1;

	this.fetchMarkerForPlace = function(place){
		return view.markers[place.place_id];
	};
	this.showInfoForPlace = function(){
		// li's callback, this should be $data\place
		const marker = self.fetchMarkerForPlace(this);
		if(!self.placeInfoWindow){
			self.placeInfoWindow = new google.maps.InfoWindow();
		}
		self.getPlacesDetails(marker, self.placeInfoWindow);
	};
	this.hideListings = function(){
        for(let prop in view.markers){
            view.markers[prop].setMap(null);
        } 
    };
	this.changeCurrentPiece = function(){
		const key = $('select').val();
		if(key == 'all'){
			self.currentPiece(self.wholePiece());
		}else{
			self.currentPiece(places()[key]);
		}
		self.hideListings();
		self.createMarkersForPlaces(self.currentPiece())
	};
	this.fitScreen = function(){
		let bounds = new google.maps.LatLngBounds();
		for(let place of this.currentPiece()){
			bounds.union(place.geometry.viewport);
			// bounds.extend(place.geometry.location);
		}
		// get marker.position from currentPiece
		map.fitBounds(bounds);
	}
	// places is Array of places
    this.createMarkersForPlaces = function(places) {
        var bounds = new google.maps.LatLngBounds();
        var placeInfoWindow = new google.maps.InfoWindow();
        for (var i = 0; i < places.length; i++) {
          var place = places[i];
          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location,
            id: place.place_id
          });
          view.markers[place.place_id] = marker;
          // If a marker is clicked, do a place details search on it in the next function.
          marker.addListener('click', function() {
            if (placeInfoWindow.marker == this) {
                console.log("This infowindow already is on this marker!");
            } else {
                self.getPlacesDetails(this, placeInfoWindow);
            }
          });
          // when init, currentPiece is empty, create bounds by exist marker
          // when init complete, use fitScreen()
          if(vModel.wholePiece().length < scale){
	          if (place.geometry.viewport) {
	            // Only geocodes have viewport.
	            bounds.union(place.geometry.viewport);
	          } else {
	            bounds.extend(place.geometry.location);
	          }
          }
        }
        view.bounds = bounds;
        if(vModel.wholePiece().length < scale){
        	map.fitBounds(bounds);
        }else{
        	this.fitScreen();
        }
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

window.gm_authFailure = function() {
    alert('谷歌地图加载失败!');
}

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
		zoom: 11,
		styles: styles,
		mapTypeControl:false,
        streetViewControl:true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
	});

	window.map.addListener('tilesloaded', function(){
		let pro = Promise.resolve();
		// parallel requests
		for(let interest of interests()){
			let tempPro = new Promise(function(resolve, reject){
				searchPlaces(interest, resolve);
			}).then(function(places){
				vModel.createMarkersForPlaces(places);
			});
			pro = pro.then(function(){
				return tempPro;
			});
		}
		// after all requests are responsed, load response in model
		pro.then(function(){
			initViewModel();
		});
		google.maps.event.clearListeners(window.map, 'tilesloaded');
	});

	// request data from google
	function searchPlaces(query, resolve){
		let placesService = new google.maps.places.PlacesService(map);
		let bounds = map.getBounds();

		placesService.textSearch({
			query: query,
			bounds: bounds
		}, function(results, status){
			if(status === google.maps.places.PlacesServiceStatus.OK){
				places()[query] = [];
				for(let i = 0; i < scale; i++){
					places()[query].push(results[i]);
				}
				// places()[query].push(...results);
				vModel.keys.push(query);
				if(resolve instanceof Function){
					resolve(places()[query]);
				}
			}
		});
	}

}
