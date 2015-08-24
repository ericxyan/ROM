angular.module('starter.controllers', ['ngMap', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaSocialSharing) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // Google maps
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

///////////////
// News Ctrl //
///////////////
.controller('newsCtrl', function ($scope, $stateParams, $cordovaInAppBrowser, $cordovaSocialSharing) {
  $scope.newsbox = [
    {
      'title': 'ROM Summer Fridays',
      'date': 'Friday, 4:30 pm - 8:30 pm',
      'img': 'img/romsummerfriday_0.png',
      'url': 'https://www.rom.on.ca/en/activities-programs/events-calendar/rom-summer-fridays-0#overlay-context=en',
      'like': 5,
      'content': 'Relax at ROMpeii Piazza during ROM Summer Fridays. Enjoy an intimate cafe inspired by the exhibition Pompeii. Sip Italian wines, bubbly prosecco, or an ice-cold Peroni beer, snack on simple antipasti, or enjoy an espresso and biscotti. Included with Museum admission; food and beverages extra. In the Rotunda on the ground floor.'
    },
    {
      'title': 'POMPEII in the shadow of the volcano',
      'date': 'Now open until January 3',
      'img': 'img/pompeii_carousel.png',
      'url': 'http://www.rom.on.ca/en/Pompeii',
      'like': 10,
      'content': 'Almost two thousand years ago, a volcano in southern Italy - Mount Vesuvius - erupted with tremendous force and little warning. Within 24 hours, the nearby Roman city of Pompeii was buried under a rain of hot ash and falling debris, lying undiscovered for over 1,600 years.'
    }    
  ];

  $scope.news = $scope.newsbox[$stateParams.newsId];

  // Open browser
  $scope.browser = function(url) {
    window.open(url, '_system', 'location=yes'); 
    return false;
  };

  // share via native share sheet
  $scope.share = function (message, link) {
    $cordovaSocialSharing
      .share(message, null, null, link) // Share via native share sheet
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occured. Show a message to the user
      });
  }
})

//////////////////
// Gallery Ctrl //
//////////////////
.controller('galleryCtrl', function ($scope, $stateParams, $cordovaSocialSharing, markerList) {
  $scope.galleriesbox = [
      // level 1
      [
        {
          'name': 'Sigmund Samuel Gallery of Canada',
          'img': 'img/general-wolf-big-one.jpg',
          'like': 0,
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

  var level = $stateParams.level || 0;
  var num = $stateParams.num || 0;
  $scope.showGallery = $scope.galleriesbox[level][num];
  // share via native share sheet
  $scope.share = function (message, link) {
    $cordovaSocialSharing
      .share(message, null, null, link) // Share via native share sheet
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occured. Show a message to the user
      });
  };

  $scope.addMarker = function(){
    markerList.changeLike();
    if(markerList.getLike()){
      markerList.addMarkers();
    }
    else{
      markerList.deleteMarkers();
    }
    return markerList.getLike();
  };

  $scope.getLike = function(){
    return markerList.getLike();
  };
})

//////////////////
// Maplist Ctrl //
//////////////////
.controller('MaplistCtrl', function($scope) {
  $scope.maplist = [
    { title: 'Level 1', id: 0 },
    { title: 'Level 2', id: 1 },
    { title: 'Level 3', id: 2 },
    { title: 'Level 4', id: 3 },
  ];
})

//////////////
// Map Ctrl //
//////////////
.controller('MapCtrl', function($scope, $stateParams) {
  $scope.mapId = $stateParams.mapId;
})

/////////////////////
// Navigation Ctrl //
/////////////////////
.controller('navigation', function($scope, $ionicLoading, $cordovaGeolocation, $ionicPopup, $ionicModal, $stateParams ,pathRecords, markerList) {

  $scope.toggle = {
    track: false
  };

  $scope.positions = [
    {lat:43.667485,lng:-79.394915,posid: 'chineseArchi'},{lat:43.667779, lng:-79.394262, posid:'rtounda'}
  ];

  $scope.myGallery = {
    'level': $stateParams.level,
    'lat': $stateParams.lat,
    'lng': $stateParams.lng
  };

  // Gallery Modals
  $ionicModal.fromTemplateUrl('galleries-detail.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Makers
  $scope.addMarker = function(event) {
    var ll = event.latLng;
    $scope.positions.push({lat:ll.lat(), lng: ll.lng()});
  };

  $scope.init = function() {
    $scope.positions = markerList.getMarkers();
  };
  $scope.addMarkers = function() {
    $scope.positions= [{lat:43.667665, lng: -79.394242}];
  };
  $scope.deleteMarkers = function() {
    $scope.positions = [];
  };
  $scope.showMarkers = function() {
    $scope.positions = markerList.getMarkers();
    for (var key in $scope.map.markers) {
      $scope.map.markers[key].setMap($scope.map);
    };
  };
  $scope.hideMarkers = function() {
    $scope.positions = markerList.getMarkers();
    for (var key in $scope.map.markers) {
      $scope.map.markers[key].setMap(null);
    };
  };

  // Center on me

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  $scope.centerOnMe= function(){
    //$scope.positions = [];

    $ionicLoading.show({
      template: 'Loading...'
    });

    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //$scope.positions.push({lat: pos.k,lng: pos.B});
      //console.log(pos);
      $scope.map.setCenter(pos);
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      $scope.myPos.lat = lat;
      $scope.myPos.lng = long;
      //$scope.watchPos.push({lat: lat, lng: long});
      $ionicLoading.hide();
    });

  };
    // Wait for Cordova to load
    //
    // document.addEventListener("deviceready", onDeviceReady, false);

  var watchID = null;

  var options = { timeout: 30000 };
  var alertPopup;

  $scope.trackPath = function () {
    if($scope.toggle.track) {
      watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
      alertPopup = $ionicPopup.alert ({
        title: "Track",
        template: "Start Tracking"
      });
      alertPopup.then(function(res) {
        console.log("Start tracking!");
        $scope.centerOnMe();
      });
    }
    else {
      navigator.geolocation.clearWatch(watchID);
      alertPopup = $ionicPopup.alert ({
        title: "Track",
        template: "Stop Tracking"
      });
      alertPopup.then(function(res) {
        console.log("Start tracking!");
      });
    }
  };

  //watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
  // onSuccess Geolocation
  var gallery = {
    lat: 43.667733, 
    lng: -79.394642
  };

  function onSuccess(position) {
    //$scope.watchPos.push({lat: position.coords.latitude, lng: position.coords.longitude});
    $scope.pathRecords.positions.push([position.coords.latitude,  position.coords.longitude]);
    var x = myPos.lat;
    var y = myPos.lng;
    var dx = (x - gallery.lat) * 100000;
    var dy = (y - gallery.lng) * 100000;
    var dist = Math.sqrt(dx * dx + dy * dy);
    // near a gallery
    if (dist < 2500){
      alert("here!");
    }
  };

  // onError Callback receives a PositionError object
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  };

  $scope.moveTo = function () {
    $scope.myPos.lat = 43.667730;
    $scope.myPos.lng = -79.394640;
    var x = myPos.lat;
    var y = myPos.lng;
    var dx = (x - gallery.lat) * 100000;
    var dy = (y - gallery.lng) * 100000;
    var dist = Math.sqrt(dx * dx + dy * dy);
    // near a gallery
    if (dist < 2500){
      alert("here!");
    }
    alert("here!");
  };

  var posOptions = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: false};
  $scope.pathRecords = pathRecords;
  $scope.myPos = {
    lat: 43.667682, 
    lng: -79.394411
  };

})

/////////////////
// Camera Ctrl //
/////////////////
.controller('cameraCtrl', function($scope, Camera, $cordovaSocialSharing, $window){
  $scope.album = JSON.parse($window.localStorage['album'] || '[]');
  if (!$scope.album.length) $scope.album.push('img/album1.png');
  $scope.imgUrl = $scope.album[0] || '';

  // Open camera
  $scope.takePhoto = function(){
    Camera.getPicture().then(function(url) {
      $scope.imgUrl = url;
      $scope.album.push(url);
      $window.localStorage['album'] = JSON.stringify($scope.album);
      console.log($scope.album);
      $scope.imgUrl = $scope.album[0];
    }, function(err){
      console.err(err);
    });
  };

  // share via native share sheet
  $scope.share = function (file) {
    $cordovaSocialSharing
      .share(null, null, file, null) // Share via native share sheet
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occured. Show a message to the user
      });
  }

  // share anywhere
  $scope.shareToFacebook = function(image){
    $cordovaSocialSharing
      .shareViaFacebook(null, image, null)
      .then(function(result) {
        // Success!
      }, function(err) {
        // An error occurred. Show a message to the user
      });
  }

  // delete a photo
  $scope.deletePhoto = function (index) {
    $scope.album.splice(index,1);
    $window.localStorage['album'] = JSON.stringify($scope.album);
  } 
})

///////////////
//QR Scanner //
///////////////
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