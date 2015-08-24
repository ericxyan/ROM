angular.module('starter.services', [])

.factory('pathRecords', function(){
  return {
    positions: [
      [43.668240, -79.394965],
      [43.667810, -79.394749],
      [43.667721, -79.395105],
      [43.667871, -79.395214],
      [43.667836, -79.395333],
      [43.667445, -79.395135],
      [43.667238, -79.395042],
      [43.667266, -79.394907],
      [43.667463, -79.395012],
      [43.667504, -79.394835],
      [43.667580, -79.394866],
      [43.667682, -79.394411]
    ]
  }
})
.factory('markerList', function(){
  var factory = {};
  var markers = [];
  var galleriesbox = [
      // level 1
      [
        {
          'name': 'Sigmund Samuel Gallery of Canada',
          'img': 'img/general-wolf-big-one.jpg',
          'like': 0,
          'fave': false,
          'location': {
            'level': 1,
            'lat': 43.667591, 
            'lng': -79.394195
          },
          'content': 'Canada\'s heritage is one of diverse cultures and deep roots. Originally influenced by English, French and Aboriginal cultures, and more recently by a mosaic of international ethnicity, the essence of Canadian-ness and its changing emblems and symbols of identity play a key role in placing context around the collections in this growing gallery. Behold the world of early Canada told through the lens of the rich decorative and pictorial arts produced by the early settlers from France and Great Britain. Continue the story of Canada\'s cultural heritage with a growing contemporary collection reflecting the cultures of successive generations of immigrants. Furniture, historical artifacts, landscape paintings, portraits, religious artifacts and modern design help us understand where Canadians have come from, how they lived, the evolving nature of Canadian identity and Canadian-ness, and its ongoing contribution to the nation\'s cultural fabric.'
        },
        {
          'name': 'Daphne Cockwell Gallery of Canada: First Peoples',
          'img': "img/rom2008_10320_2-two.jpg",
          'like': 0,
          'fave': false,
          'location': {
            'level': 1,
            'lat': 43.667591, 
            'lng': -79.394195
          },
          'content': 'Canada\'s heritage is one of diverse cultures and deep roots. Originally influenced by English, French and Aboriginal cultures, and more recently by a mosaic of international ethnicity, the essence of Canadian-ness and its changing emblems and symbols of identity play a key role in placing context around the collections in this growing gallery. Behold the world of early Canada told through the lens of the rich decorative and pictorial arts produced by the early settlers from France and Great Britain. Continue the story of Canada\'s cultural heritage with a growing contemporary collection reflecting the cultures of successive generations of immigrants. Furniture, historical artifacts, landscape paintings, portraits, religious artifacts and modern design help us understand where Canadians have come from, how they lived, the evolving nature of Canadian identity and Canadian-ness, and its ongoing contribution to the nation\'s cultural fabric.'
        }
      ], 
      // level 2
      [
        {
          'name': 'The Bat Cave',
          'img': "img/rom2012_12913_10-two.jpg",
          'like': 0,
          'fave': false,
          'location': {
            'level': 1,
            'lat': 43.667591, 
            'lng': -79.394195
          },
          'content': 'Canada\'s heritage is one of diverse cultures and deep roots. Originally influenced by English, French and Aboriginal cultures, and more recently by a mosaic of international ethnicity, the essence of Canadian-ness and its changing emblems and symbols of identity play a key role in placing context around the collections in this growing gallery. Behold the world of early Canada told through the lens of the rich decorative and pictorial arts produced by the early settlers from France and Great Britain. Continue the story of Canada\'s cultural heritage with a growing contemporary collection reflecting the cultures of successive generations of immigrants. Furniture, historical artifacts, landscape paintings, portraits, religious artifacts and modern design help us understand where Canadians have come from, how they lived, the evolving nature of Canadian identity and Canadian-ness, and its ongoing contribution to the nation\'s cultural fabric.'
        }
      ],
      // level 3
      [
        {
          'name': 'Eaton Gallery of Rome',
          'img': 'img/romsep2pm205_6_7_8_9.jpg',
          'url': 'https://www.rom.on.ca/en/exhibitions-galleries/galleries/world-cultures/eaton-gallery-rome',
          'like': 10,
          'fave': false,
          'location': {
            'level': 3,
            'lat': 43.667607,
            'lng': -79.395010
          },
          'content': 'The legacy of Rome and its empire endures to this day. Roman generals and emperors conquered foreign lands and left their mark, still visible today in art and architectural remains throughout Europe and the Middle East. Rome was home to some of the world\'s greatest engineering accomplishments, such as the Colosseum where gladiators fought, often to the death. Aspects of Roman law form the basis of today’s law codes. In this gallery ancient Rome is brought to life through the largest collection of Roman artifacts in Canada. The thematic display takes you on a journey spanning over 1000 years of history through Republican and Imperial Rome and encompassing a vast geographic area from Britain to Egypt. The gallery also includes the Bratty Exhibit of Etruria, which throws light on the culture of the Etruscans, Rome’s enigmatic Italian neighbours.'
        }
      ],
      // leve 4
      []
  ];
  factory.getGalleriesbox = function(){
    return galleriesbox;
  }
  factory.getGallery = function(level, num){
    return galleriesbox[level][num];
  }
  factory.getFave = function(level, num){
    return galleriesbox[level][num].fave;
  }
  factory.changeFave = function(level, num){
    galleriesbox[level][num].fave = !galleriesbox[level][num].fave;
  }
  factory.getMarkers = function(){
    return markers;
  }
  factory.addMarkers = function(lat1, lng1){
    markers.push({'lat':lat1,'lng':lng1});
  }
  factory.deleteMarkers = function(){
    markers = [];
  }
  return factory;
})
.factory('GeoAlert', function() {
   console.log('GeoAlert service instantiated');
   var interval;
   var duration = 6000;
   var long, lat;
   var processing = false;
   var callback;
   var minDistance = 10;
    
   // Credit: http://stackoverflow.com/a/27943/52160   
   function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
   }
  
   function deg2rad(deg) {
    return deg * (Math.PI/180)
   }
   
   function hb() {
      console.log('hb running');
      if(processing) return;
      processing = true;
      navigator.geolocation.getCurrentPosition(function(position) {
        processing = false;
        console.log(lat, long);
        console.log(position.coords.latitude, position.coords.longitude);
        var dist = getDistanceFromLatLonInKm(lat, long, position.coords.latitude, position.coords.longitude);
        console.log("dist in km is "+dist);
        if(dist <= minDistance) callback();
      });
   }
   
   return {
     begin:function(lt,lg,cb) {
       long = lg;
       lat = lt;
       callback = cb;
       interval = window.setInterval(hb, duration);
       hb();
     }, 
     end: function() {
       window.clearInterval(interval);
     },
     setTarget: function(lg,lt) {
       long = lg;
       lat = lt;
     }
   };
   
})

// Camera
.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(imageUrl) {
        q.resolve(imageUrl);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])

.factory('BarcodeScanner', ['$q', function($q) {
  return {
    scan: function() {
      var q = $q.defer();

      $cordovaBarcodeScanner.scan().then(function(barcodeData) {
        // Success!
        q.resolve(barcodeData);
      }, function(err) {
        q.reject(err);
      });

      return q.promise;
    },
    encode: function(encodeType, encodeText) {
      var q = $q.defer();

      $cordovaBarcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com").then(
        function(success){
          // Success!
          q.resolve(success);
        }, function(err){
          q.reject(err);
        });

      return q.promise;
    }
  }
}])

// Local storage
.factory('localStorage', ['$window', function ($window) {
  return {
    set: function (key, value) {
      $window.localStorage[key] = value;
    },
    get: function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function (key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])
// local storage array
.factory('album', ['$window', function ($window) {
  return {
    set: function (imgUrl) {
      var album = JSON.parse($window.localStorage['album'] || '[]');
      album.push[imgUrl];
      $window.localStorage['album'] = JSON.stringify(album);
    },
    get: function () {
      return JSON.parse($window.localStorage['album'] || '[]');
    }
  }
}]);