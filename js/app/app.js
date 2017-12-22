function initMap(){
	
	window.map = new google.maps.Map(document.getElementById('map'),{
		center:{
			lat: 31.1233822,
			lng: 121.2827777
			// lat: 40.7413549,
			// lng: -73.9980224
		},
		zoom: 10,
		mapTypeControl: false
	});

	const 
		locations = [],
		places = [],
		markers = [];

	window.map.addListener('tilesloaded', function(){
		searchPlaces('pizza');
	})


	// functions ======================================
	function renderMarkers(locations){
		for(let i = 0, len = locations.length; i < len; i++){
			let position = locations[i].location;

			let marker = new google.maps.Marker({
				position: position
			});
			
			marker.setMap(window.map);
		}
	}

	function searchPlaces(query){
		let placesService = new google.maps.places.PlacesService(map),
			bounds = map.getBounds();

		placesService.textSearch({
			query: query,
			bounds: bounds
		}, function(results, status){
			if(status === google.maps.places.PlacesServiceStatus.OK){
				places.push(...results);
			}
		});
	}

}