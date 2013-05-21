
$("#map").hide();
requireCss('assets/css/demos.css');

function initCall(){ console.log("Google maps api initialized.");}

requirejs(
  {
    paths: {
      'ui.map': "build/ui-map"
    },
    shim: {
      'ui.map': { deps: [
        'https://rawgithub.com/angular-ui/ui-utils/master/modules/event/event.js',
        'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initCall'
      ] }
    }
  },
  ['ui.map'],
  function () {

    angular.module('doc.ui-map', ['ui.map', 'prettifyDirective'])
      .controller('MapCtrl', ['$scope', function ($scope) {

        $scope.myMarkers = [];

        $scope.mapOptions = {
          center: new google.maps.LatLng(35.784, -78.670),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.addMarker = function($event) {
          $scope.myMarkers.push(new google.maps.Marker({
            map: $scope.myMap,
            position: $event.latLng
          }));
        };

        $scope.setZoomMessage = function(zoom) {
          $scope.zoomMessage = 'You just zoomed to '+zoom+'!';
          console.log(zoom,'zoomed');
        };

        $scope.openMarkerInfo = function(marker) {
          $scope.currentMarker = marker;
          $scope.currentMarkerLat = marker.getPosition().lat();
          $scope.currentMarkerLng = marker.getPosition().lng();
          $scope.myInfoWindow.open($scope.myMap, marker);
        };

        $scope.setMarkerPosition = function(marker, lat, lng) {
          marker.setPosition(new google.maps.LatLng(lat, lng));
        };
      }])
    ;
    e$ = $("#map");
    e$.removeAttr("ng-non-bindable");

    angular.bootstrap(e$[0], ['doc.ui-map']);
    e$.show();
    $("#map-l").slideUp();


  }
);