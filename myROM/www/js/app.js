// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js 
// 'uiGmapgoogle-maps'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.config'])

.run(function($ionicPlatform, GeoAlert) {
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

//Begin the service
    //hard coded 'target'
    var lat = 43.6677097;
    var long = -79.3947771;
    function onConfirm(idx) {
      console.log('button '+idx+' pressed');
    }
    
    GeoAlert.begin(lat,long, function() {
      console.log('TARGET');
      GeoAlert.end();
      navigator.notification.confirm(
        'You are near a target!',
        onConfirm,
        'Target!',
        ['Cancel','View']
      );
      
    });

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

  .state('app.news',{
    url: '/news',
    views: {
      'menuContent': {
        templateUrl: 'templates/news.html',
        controller: 'newsCtrl'
      }
    }
  })

  .state('app.news-detail', {
    url: '/news/:newsId',
    views: {
      'menuContent': {
        templateUrl: 'templates/news-detail.html',
        controller: 'newsCtrl'
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
  })

  .state('app.galleries', {
    url: '/galleries',
    views: {
      'menuContent': {
        templateUrl: 'templates/galleries.html',
        controller: 'galleryCtrl'
      }
    }
  })

  .state('app.galleries-detail',{
    url: '/galleries/:level/:num',
    views: {
      'menuContent': {
        templateUrl: 'templates/galleries-detail.html',
<<<<<<< HEAD
        controller: 'galleryCtrl'
=======
        controller: 'galleryDetailController'
>>>>>>> 3b273e3834c55b251d925879f51e5e90772388c7
      }
    }
  })

  .state('app.locateGallery', {
      url: '/navigation/:level/:lat/:lng',
      views: {
        'menuContent': {
          templateUrl: 'templates/navigation.html',
          controller:'navigation'
        }
      }
    })

  .state('app.navigation', {
      url: '/navigation',
      views: {
        'menuContent': {
          templateUrl: 'templates/navigation.html',
          controller:'navigation'
        }
      }
    })

  .state('app.tickets', {
    url: '/tickets',
    views: {
      'menuContent': {
        templateUrl: 'templates/tickets.html',
      }
    }
  })

  .state('app.scan', {
    url: '/scan',
    views: {
      'menuContent': {
        templateUrl: 'templates/scan.html',
        controller: 'QRScannerCtrl'
      }
    }
  })

  .state('app.camera', {
    url: '/camera',
    views: {
      'menuContent': {
        templateUrl: 'templates/camera.html',
        controller: 'cameraCtrl'
      }
    }
  })

  .state('app.feedback', {
    url: '/feedback',
    views: {
      'menuContent': {
        templateUrl: 'templates/feedback.html',
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
