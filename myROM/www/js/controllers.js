angular.module('starter.controllers', ['ngMap'])

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

  // Create the login modal that we will use later
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

.controller('navigation', function($scope){
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
});
