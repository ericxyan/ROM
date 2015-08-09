angular.module('starter.services', [])

.factory('pathRecords', function(){
  return {
    positions: []
  }
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

.factory('SocialSharing', ['$q', function($q) {
  return {
    share: function (message, subject, file, link) {
      var q = $q.defer();
      $cordovaSocialSharing.share(message, subject, file, link).then(function(success){
        // Success!
        q.resolve(success);
      }, function(err) {
        // Error!
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