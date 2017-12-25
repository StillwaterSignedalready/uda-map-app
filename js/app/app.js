
const 
	city = {
		latlng: {lat: 31.1233822,lng: 121.2827777},
		name: '上海',
		adcode: 310000
	},
	locations = ko.observableArray([]),
	places = ko.observable({}),
	// 留下了扩展的接口，scale是每项interest请求place的数量
	// interests是搜索place用的关键词，将用于筛选
	scale = 7,
	interests = ko.observableArray(['幼儿园','公园','大学']);

const view = {
	markers: {},
	// 只有一个infowindow显示
	infowindow: {}
};

const ViewModel = function(){

	const self = this;

	this.places = places;
	this.keys = ko.observableArray(['all']);
	this.keyChosen = ko.observableArray(['all']);
	this.wholePiece = ko.observableArray([]);
	this.currentPiece = ko.observableArray(this.wholePiece());
	this.weather = ko.observable({});

	// li's callback, this should be $data\place
	this.liToMarkerAnima = function(place){
		// place -> marker
		let marker = self.fetchMarkerForPlace(place);
		// animate marker
        if(marker.getAnimation() !== null){
            marker.getAnimation(null)
        }else{
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){
                marker.setAnimation(null)
            },700);
        }
	};
	this.fetchMarkerForPlace = function(place){
		return view.markers[place.place_id];
	};
	// li's callback, this should be $data\place
	this.showInfoForPlace = function(){
		const marker = self.fetchMarkerForPlace(this);
		self.getPlacesDetails(marker, view.infowindow);
	};
	this.hideListings = function(){
        for(let prop in view.markers){
            view.markers[prop].setMap(null);
        } 
    };
    this.showListings = function(){
    	for(let place of this.currentPiece()){
            this.fetchMarkerForPlace(place).setMap(map);
        }
        this.fitScreen();
    }
    // filter的event callback,切换currentPice并render
	this.changeCurrentPiece = function(){
		const key = $('select').val();
		if(key == 'all'){
			self.currentPiece(self.wholePiece());
		}else{
			self.currentPiece(places()[key]);
		}
		self.hideListings();
		self.showListings();
	};
	// 根据当前数据currentPiece调节map.bounds
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
        // only one infowindow
        var placeInfoWindow = view.infowindow;
        for (var i = 0; i < places.length; i++) {
          var place = places[i];
          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            title: place.name,
            position: place.geometry.location,
            animation: google.maps.Animation.DROP,
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
          if(vModel.wholePiece().length < scale - 1){
	          if (place.geometry.viewport) {
	            // Only geocodes have viewport.
	            bounds.union(place.geometry.viewport);
	          } else {
	            bounds.extend(place.geometry.location);
	          }
          }
        }
        if(vModel.wholePiece().length < scale - 1){
        	map.fitBounds(bounds);
        }else{
        	this.fitScreen();
        }
    };
    // 加载marker的数据到infowindow
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

$('.icon').click(function(){
	$('aside').toggleClass('toggle');
	$('#map').toggleClass('toggle');
	setTimeout(function(){
		vModel.fitScreen();
	}, 200);
});

window.gm_authFailure = function() {
    alert('谷歌地图加载失败!');
}

/* functions below ====================================== */
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

	window.map = new google.maps.Map(document.getElementById('map'),{
		center:city.latlng,
		zoom: 11,
		styles: styles,
		mapTypeControl:false,
        streetViewControl:true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
	});

	// tilesloaded事件意味着地图初始化完成，开始抓取数据并渲染
	window.map.addListener('tilesloaded', function(){
		// 解除事件绑定，防止此匿名函数再次运行
		google.maps.event.clearListeners(window.map, 'tilesloaded');

		view.infowindow = new google.maps.InfoWindow();
		let pro = Promise.resolve();
		// 并行请求数据
		for(let interest of interests()){
			// request data, then render data to markers
			let tempPro = new Promise(function(resolve, reject){
				searchPlaces(interest, resolve);
			});
			tempPro.then(function(places){
				vModel.createMarkersForPlaces(places);
			});
			// correspond promises of markers
			pro = pro.then(function(){
				return tempPro;
			});
		}
		// 处理完数据后, 将数据写入vModel中的缓存
		pro.then(function(){
			initViewModel();
		});
		// 窗口变形后，地图自动适应窗口大小
		// fitScreen需要地图加载完成才能运行
	    $(window).resize(function(){
	        vModel.fitScreen()
	    });
		/* ===向高德请求城市天气数据=== */ 
		const url = `http://restapi.amap.com/v3/weather/weatherInfo?city=${city.adcode}&key=539c30e70e56909fd984d51612227f6a`;
		fetch(url)
		.then(response => response.json())
		.then(obj => {
			window.weather = obj;
			vModel.weather(obj.lives[0]);
		});
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
				// fetch a piece of data, data的规模由model.scale控制
				for(let i = 0; i < scale; i++){
					places()[query].push(results[i]);
				}
				vModel.keys.push(query);
				if(resolve instanceof Function){
					resolve(places()[query]);
				}
			}
		});
	}

}
