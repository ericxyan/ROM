angular.module('starter.controllers', ['ngMap', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // Google maps
  //$scope.map = { center: { latitude: 43.6677097, longitude: -79.3947771 }, zoom: 19 };
  $scope.maplist = [
    { title: 'Level 1', id: 0, url: 'img/rom-level1.png' },
    { title: 'Level 2', id: 1, url: 'img/rom-level2.png' },
    { title: 'Level 3', id: 2 },
    { title: 'Level 4', id: 3 },
  ];
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later`
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('MaplistCtrl', function($scope) {
  $scope.maplist = [
    { title: 'Level 1', id: 0 },
    { title: 'Level 2', id: 1 },
    { title: 'Level 3', id: 2 },
    { title: 'Level 4', id: 3 },
  ];
})

.controller('MapCtrl', function($scope, $stateParams) {
  $scope.mapId = $stateParams.mapId;
})

.controller('navigation', function($scope, $ionicLoading, $cordovaGeolocation, pathRecords){
  $scope.positions = [
    {lat:43.667485,lng:-79.394915,posid: 'chineseArchi'},{lat:43.667779, lng:-79.394262, posid:'rtounda'}
  ];

  $scope.addMarker = function(event) {
    var ll = event.latLng;
    $scope.positions.push({lat:ll.lat(), lng: ll.lng()});
  }
  $scope.deleteMarkers = function() {
    $scope.positions = [];
  };
  $scope.showMarkers = function() {
    for (var key in $scope.map.markers) {
      $scope.map.markers[key].setMap($scope.map);
    };
  };
  $scope.hideMarkers = function() {
    for (var key in $scope.map.markers) {
      $scope.map.markers[key].setMap(null);
    };
  };

  // Center on me

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  $scope.centerOnMe= function(){
    $scope.positions = [];

    $ionicLoading.show({
      template: 'Loading...'
    });

    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $scope.positions.push({lat: pos.k,lng: pos.B});
      console.log(pos);
      $scope.map.setCenter(pos);
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      $scope.myPos.lat = lat;
      $scope.myPos.lng = long;
      $scope.watchPos.push({lat: lat, lng: long});
      $ionicLoading.hide();
    });

  };
    // Wait for Cordova to load
    //
    // document.addEventListener("deviceready", onDeviceReady, false);

    var watchID = null;

    // Cordova is ready
    //
/*    function onDeviceReady() {
        // Throw an error if no update is received every 30 seconds
        
    }*/
        var options = { timeout: 30000 };
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
    // onSuccess Geolocation
    //
    function onSuccess(position) {
      $scope.watchPos.push({lat: position.coords.latitude, lng: position.coords.longitude});
      $scope.pathRecords.positions.push([position.coords.latitude,  position.coords.longitude]);
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

/*  var watchID = navigator.geolocation.watchPosition(function(position){
      $scope.watchPos.push({lat: position.coords.latitude, lng: position.coords.longitude});
      $scope.pathRecords.positions.push([position.coords.latitude,  position.coords.longitude]);
  });*/

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $scope.pathRecords = pathRecords;
  $scope.myPos = {};
  $scope.watchPos = [];
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      $scope.myPos.lat = lat;
      $scope.myPos.lng = long;
      $scope.watchPos.push({lat: lat, lng: long});

    }, function(err) {
      // error
    });

/*  var watchOptions = {
    frequency : 1000,
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      $scope.myPos.lat = lat;
      $scope.myPos.lng = long;
      $scope.watchPos.push({lat: lat, lng: long});
      $scope.pathRecords.positions.push([lat, long]);
  },
    function(err) {
      // error
    },
    function(position) {
      // nothing
  });*/

})

.controller('cameraCtrl', function($scope, Camera,$cordovaSocialSharing, $window){
  $scope.album = JSON.parse($window.localStorage['album'] || '[]');
  $scope.album.push('img/album1.png');
  $scope.imgUrl = $scope.album[0] || '';
  $scope.takePhoto = function(){
    Camera.getPicture().then(function(url) {
      //$scope.imgUrl = url;
      $scope.album.push(url);
      $window.localStorage['album'] = JSON.stringify($scope.album);
      console.log($scope.album);
      $scope.imgUrl = $scope.album[0];
    }, function(err){
      console.err(err);
    });
  };

  // share anywhere
  $scope.shareToFacebook = function(){
    $cordovaSocialSharing
      .share(message, subject, file, link) // Share via native share sheet
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occured. Show a message to the user
      });
  }
})

//QR Scanner
.controller('QRScannerCtrl', function($scope, $cordovaBarcodeScanner) {
 
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
 
});