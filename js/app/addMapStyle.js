
if(!styles){
var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
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
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]

// [
// 	    {
// 	        "featureType": "administrative",
// 	        "elementType": "labels",
// 	        "stylers": [
// 	            {
// 	                "visibility": "simplified"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "administrative",
// 	        "elementType": "labels.text.fill",
// 	        "stylers": [
// 	            {
// 	                "color": "#444444"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "administrative.neighborhood",
// 	        "elementType": "geometry",
// 	        "stylers": [
// 	            {
// 	                "visibility": "on"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "administrative.neighborhood",
// 	        "elementType": "geometry.stroke",
// 	        "stylers": [
// 	            {
// 	                "visibility": "on"
// 	            },
// 	            {
// 	                "weight": "1.99"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "administrative.neighborhood",
// 	        "elementType": "labels.text",
// 	        "stylers": [
// 	            {
// 	                "visibility": "on"
// 	            },
// 	            {
// 	                "color": "#f35c19"
// 	            },
// 	            {
// 	                "weight": "0.01"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "landscape",
// 	        "elementType": "all",
// 	        "stylers": [
// 	            {
// 	                "color": "#f2f2f2"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "landscape",
// 	        "elementType": "geometry",
// 	        "stylers": [
// 	            {
// 	                "visibility": "on"
// 	            },
// 	            {
// 	                "lightness": "0"
// 	            },
// 	            {
// 	                "saturation": "0"
// 	            },
// 	            {
// 	                "color": "#ffddc1"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "landscape",
// 	        "elementType": "labels",
// 	        "stylers": [
// 	            {
// 	                "visibility": "off"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "landscape",
// 	        "elementType": "labels.text",
// 	        "stylers": [
// 	            {
// 	                "weight": "0.64"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "poi",
// 	        "elementType": "all",
// 	        "stylers": [
// 	            {
// 	                "visibility": "off"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "poi",
// 	        "elementType": "geometry",
// 	        "stylers": [
// 	            {
// 	                "visibility": "on"
// 	            },
// 	            {
// 	                "weight": "1"
// 	            },
// 	            {
// 	                "lightness": "63"
// 	            },
// 	            {
// 	                "color": "#fff5f0"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "poi",
// 	        "elementType": "labels",
// 	        "stylers": [
// 	            {
// 	                "color": "#ffad00"
// 	            },
// 	            {
// 	                "visibility": "off"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "poi.park",
// 	        "elementType": "geometry",
// 	        "stylers": [
// 	            {
// 	                "color": "#ffc3a0"
// 	            },
// 	            {
// 	                "lightness": "1"
// 	            },
// 	            {
// 	                "visibility": "on"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road",
// 	        "elementType": "all",
// 	        "stylers": [
// 	            {
// 	                "saturation": -100
// 	            },
// 	            {
// 	                "lightness": 45
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road",
// 	        "elementType": "labels",
// 	        "stylers": [
// 	            {
// 	                "visibility": "off"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road.highway",
// 	        "elementType": "all",
// 	        "stylers": [
// 	            {
// 	                "visibility": "simplified"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road.highway",
// 	        "elementType": "geometry",
// 	        "stylers": [
// 	            {
// 	                "visibility": "on"
// 	            },
// 	            {
// 	                "color": "#fd7539"
// 	            },
// 	            {
// 	                "weight": "0.62"
// 	            },
// 	            {
// 	                "lightness": "53"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road.highway",
// 	        "elementType": "labels",
// 	        "stylers": [
// 	            {
// 	                "visibility": "off"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road.highway",
// 	        "elementType": "labels.text",
// 	        "stylers": [
// 	            {
// 	                "visibility": "simplified"
// 	            },
// 	            {
// 	                "color": "#4e5757"
// 	            },
// 	            {
// 	                "weight": "0.01"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road.highway",
// 	        "elementType": "labels.text.fill",
// 	        "stylers": [
// 	            {
// 	                "weight": "0.01"
// 	            },
// 	            {
// 	                "visibility": "on"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road.highway",
// 	        "elementType": "labels.text.stroke",
// 	        "stylers": [
// 	            {
// 	                "color": "#ffffff"
// 	            },
// 	            {
// 	                "visibility": "on"
// 	            },
// 	            {
// 	                "weight": "0.01"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road.highway",
// 	        "elementType": "labels.icon",
// 	        "stylers": [
// 	            {
// 	                "visibility": "off"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road.highway.controlled_access",
// 	        "elementType": "labels",
// 	        "stylers": [
// 	            {
// 	                "visibility": "simplified"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road.arterial",
// 	        "elementType": "labels",
// 	        "stylers": [
// 	            {
// 	                "visibility": "simplified"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road.arterial",
// 	        "elementType": "labels.text",
// 	        "stylers": [
// 	            {
// 	                "visibility": "simplified"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road.arterial",
// 	        "elementType": "labels.icon",
// 	        "stylers": [
// 	            {
// 	                "visibility": "off"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "road.local",
// 	        "elementType": "labels",
// 	        "stylers": [
// 	            {
// 	                "visibility": "off"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "transit",
// 	        "elementType": "all",
// 	        "stylers": [
// 	            {
// 	                "visibility": "off"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "water",
// 	        "elementType": "all",
// 	        "stylers": [
// 	            {
// 	                "color": "#c6e3ec"
// 	            },
// 	            {
// 	                "visibility": "on"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "water",
// 	        "elementType": "geometry",
// 	        "stylers": [
// 	            {
// 	                "visibility": "on"
// 	            },
// 	            {
// 	                "color": "#cde1f0"
// 	            },
// 	            {
// 	                "lightness": "-3"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "water",
// 	        "elementType": "labels.text.fill",
// 	        "stylers": [
// 	            {
// 	                "weight": "0.25"
// 	            },
// 	            {
// 	                "color": "#888d8d"
// 	            }
// 	        ]
// 	    },
// 	    {
// 	        "featureType": "water",
// 	        "elementType": "labels.text.stroke",
// 	        "stylers": [
// 	            {
// 	                "weight": "0.80"
// 	            }
// 	        ]
// 	    }
// 	];
}