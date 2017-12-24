
const 
	locations = ko.observableArray([]),
	places = ko.observable({}),
	scale = 7,
	interests = ko.observableArray(['幼儿园','公园','大学']);

const view = {
	markers: {},
	bounds: {}
};
/* ViewModel =================== */ 
// const ViewModel = function(){

// 	const self = this;

// 	this.places = places;
// 	this.keys = ko.observableArray(['all']);
// 	this.keyChosen = ko.observableArray(['all']);
// 	this.wholePiece = ko.observableArray([]);
// 	this.currentPiece = ko.observableArray(this.wholePiece());
// 	// this.currentMarkers = 1;

// 	this.fetchMarkerForPlace = function(place){
// 		return view.markers[place.place_id];
// 	};
// 	this.showInfoForPlace = function(){
// 		// li's callback, this should be $data\place
// 		const marker = self.fetchMarkerForPlace(this);
// 		if(!self.placeInfoWindow){
// 			self.placeInfoWindow = new google.maps.InfoWindow();
// 		}
// 		self.getPlacesDetails(marker, self.placeInfoWindow);
// 	};
// 	this.hideListings = function(){
//         for(let prop in view.markers){
//             view.markers[prop].setMap(null);
//         } 
//     };
// 	this.changeCurrentPiece = function(){
// 		const key = $('select').val();
// 		if(key == 'all'){
// 			self.currentPiece(self.wholePiece());
// 		}else{
// 			self.currentPiece(places()[key]);
// 		}
// 		self.hideListings();
// 		self.createMarkersForPlaces(self.currentPiece())
// 	};
// 	this.fitScreen = function(){
// 		let bounds = new google.maps.LatLngBounds();
// 		for(let place of this.currentPiece()){
// 			bounds.union(place.geometry.viewport);
// 			// bounds.extend(place.geometry.location);
// 		}
// 		// get marker.position from currentPiece
// 		map.fitBounds(bounds);
// 	}
// 	// places is Array of places
//     this.createMarkersForPlaces = function(places) {
//         var bounds = new google.maps.LatLngBounds();
//         var placeInfoWindow = new google.maps.InfoWindow();
//         for (var i = 0; i < places.length; i++) {
//           var place = places[i];
//           // Create a marker for each place.
//           var marker = new google.maps.Marker({
//             map: map,
//             title: place.name,
//             position: place.geometry.location,
//             id: place.place_id
//           });
//           view.markers[place.place_id] = marker;
//           // If a marker is clicked, do a place details search on it in the next function.
//           marker.addListener('click', function() {
//             if (placeInfoWindow.marker == this) {
//                 console.log("This infowindow already is on this marker!");
//             } else {
//                 self.getPlacesDetails(this, placeInfoWindow);
//             }
//           });
//           // when init, currentPiece is empty, create bounds by exist marker
//           // when init complete, use fitScreen()
//           if(vModel.wholePiece().length < scale){
// 	          if (place.geometry.viewport) {
// 	            // Only geocodes have viewport.
// 	            bounds.union(place.geometry.viewport);
// 	          } else {
// 	            bounds.extend(place.geometry.location);
// 	          }
//           }
//         }
//         view.bounds = bounds;
//         if(vModel.wholePiece().length < scale){
//         	map.fitBounds(bounds);
//         }else{
//         	this.fitScreen();
//         }
//     };
//     this.getPlacesDetails = function(marker, infowindow) {
//       var service = new google.maps.places.PlacesService(map);
//       service.getDetails({
//         placeId: marker.id
//       }, function(place, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           // Set the marker property on this infowindow so it isn't created again.
//           infowindow.marker = marker;
//           var innerHTML = '<div>';
//           if (place.name) {
//             innerHTML += '<strong>' + place.name + '</strong>';
//           }
//           if (place.formatted_address) {
//             innerHTML += '<br>' + place.formatted_address;
//           }
//           if (place.formatted_phone_number) {
//             innerHTML += '<br>' + place.formatted_phone_number;
//           }
//           if (place.opening_hours) {
//             innerHTML += '<br><br><strong>Hours:</strong><br>' +
//                 place.opening_hours.weekday_text[0] + '<br>' +
//                 place.opening_hours.weekday_text[1] + '<br>' +
//                 place.opening_hours.weekday_text[2] + '<br>' +
//                 place.opening_hours.weekday_text[3] + '<br>' +
//                 place.opening_hours.weekday_text[4] + '<br>' +
//                 place.opening_hours.weekday_text[5] + '<br>' +
//                 place.opening_hours.weekday_text[6];
//           }
//           if (place.photos) {
//             innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
//                 {maxHeight: 100, maxWidth: 200}) + '">';
//           }
//           innerHTML += '</div>';
//           infowindow.setContent(innerHTML);
//           infowindow.open(map, marker);
//           // Make sure the marker property is cleared if the infowindow is closed.
//           infowindow.addListener('closeclick', function() {
//             infowindow.marker = null;
//           });
//         }
//       });
//     };

// }

// const vModel = new ViewModel();
/* ViewModel =================== */ 
// window.gm_authFailure = function() {
//     alert('谷歌地图加载失败!');
// }

// functions ======================================	
// function initViewModel(){
// 	for(let prop in places()){
// 		const arr = places()[prop];
// 		// why ko array hasn't concat?!
// 		for(let i = 0, len = arr.length; i < len; i++){
// 			vModel.wholePiece.push(arr[i]);
// 		}
// 	}
// 	ko.applyBindings(vModel);
// }

function initMap(){

	window.map = new google.maps.Map(document.getElementById('map'),{
		center:{lat: 31.1233822,lng: 121.2827777},
		zoom: 11,
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
		// google.maps.event.clearInstanceListeners(window.map);
	});

	// request data from google
	// function searchPlaces(query, resolve){
	// 	let placesService = new google.maps.places.PlacesService(map);
	// 	let bounds = map.getBounds();

	// 	placesService.textSearch({
	// 		query: query,
	// 		bounds: bounds
	// 	}, function(results, status){
	// 		if(status === google.maps.places.PlacesServiceStatus.OK){
	// 			places()[query] = [];
	// 			for(let i = 0; i < scale; i++){
	// 				places()[query].push(results[i]);
	// 			}
	// 			// places()[query].push(...results);
	// 			vModel.keys.push(query);
	// 			if(resolve instanceof Function){
	// 				resolve(places()[query]);
	// 			}
	// 		}
	// 	});
	// }

}
// var map,
//     markers = [],
//     placeMarkers = [];

// function initMap(){


//     map = new google.maps.Map(document.getElementById('map'),{
//         center:{lat: 40.7413549, lng: -73.9980224},
//         zoom: 13,
//         mapTypeControl: false
//     });

//     var locations = [
//       {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
//       {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
//       {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
//       {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
//       {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
//       {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
//     ];

//     // var bounds = new google.maps.LatLngBounds();
//     for(let i = 0; i < locations.length; i ++){
//         var position = locations[i].location;
//         var title = locations[i].title;
        
//         var marker = new google.maps.Marker({
//             position: position,
//             title: title,
//             animation: google.maps.Animation.DROP,
//             id: i,

//         });

//         markers.push(marker);
//     }
// }
//     function showListings(){
//         var bounds = new google.maps.LatLngBounds();
//         for(var i = 0; i < markers.length; i++){
//             markers[i].setMap(map);
//             bounds.extend(markers[i].position);
//         }
//         map.fitBounds(bounds);
//     }

//     function hideListings(){
//         for(var i = 0; i < markers.length; i++){
//             markers[i].setMap(null);
//         } 
//     }


// var b = map.getBounds();map.fitBounds(b)