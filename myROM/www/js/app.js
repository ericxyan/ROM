// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home',{
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.galleries', {
    url: '/galleries',
    views: {
      'menuContent': {
        templateUrl: 'templates/galleries.html'
      }
    }
  })

  .state('galleries.galleries-detail',{
    url: '/galleries/:galleryId',
    views: {
      'menuContent': {
        templateUrl: 'templates/galleries-detail.html'
      }
    }
  })


  .state('app.navigation', {
      url: '/navigation',
      views: {
        'menuContent': {
          templateUrl: 'templates/navigation.html',

        }
      }
    })
    .state('app.maps', {
      url: '/maps',
      views: {
        'menuContent': {
          templateUrl: 'templates/maps.html',
          controller: 'MaplistCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/maps/:mapId',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
