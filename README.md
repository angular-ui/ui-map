# UI.Map [![Build Status](https://secure.travis-ci.org/angular-ui/ui-map.png)](http://travis-ci.org/angular-ui/ui-map)

This directive allows you to add [Google Maps Javascript API](https://developers.google.com/maps/) elements.

## Requirements

- AngularJS
- [UI.Event](https://github.com/angular-ui/ui-utils/blob/master/modules/event/event.js)
- [Google Maps Javascript API 3.x](https://developers.google.com/maps/documentation/javascript/)

## Usage

You can get it from [Bower](http://bower.io/)

```sh
bower install angular-ui-map
```  

This will copy the UI.Map files into a `bower_components` folder, along with its dependencies. Load the script files in your application:

```html
<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<script type="text/javascript" src="bower_components/angular-ui-utils/modules/event/event.js "></script>
<script type="text/javascript" src="bower_components/angular-ui-map/src/map.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=onGoogleReady"></script>
```

__Make sure to listen to the [callback parameter when loading the Google Maps API](https://developers.google.com/maps/documentation/javascript/examples/map-simple-async) !   
The API must be fully loaded before this module !__  
Here we name this callback `onGoogleReady`. To load your angular app after the Google Maps API you can start it with [angular.bootstrap](http://docs.angularjs.org/api/angular.bootstrap). 

```javascript
function onGoogleReady() {
  angular.bootstrap(document.getElementById("map"), ['app.ui-map']);
}
```

Add the UI.Map module as a dependency to your application module :

```javascript
var myAppModule = angular.module('app.ui-map', ['ui.map']);  
```

Finally, add the directive to your html:

```html
<section id="map" ng-controller="MapCtrl" >
  <div ui-map="myMap" ui-options="mapOptions" class="map-canvas"></div>
</section>
```
Note that `myMap` will be a [google.maps.Map class](https://developers.google.com/maps/documentation/javascript/reference#Map), and `mapOptions` a [google.maps.MapOptions object](https://developers.google.com/maps/documentation/javascript/reference#MapOptions) (see [below](#options)).

To see something it's better to add some CSS, like

```css
.map-canvas { height: 400px; }
```

## Options

[google.maps.MapOptions object](https://developers.google.com/maps/documentation/javascript/reference#MapOptions) can be passed through the main directive attribute`ui-map`.

```javascript
myAppModule.controller('MapCtrl', ['$scope', function ($scope) {
    $scope.mapOptions = {
      center: new google.maps.LatLng(35.784, -78.670),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  }]);
```

### UI.Event

[UI.Event](http://angular-ui.github.io/ui-utils/#/event) allows you to specify custom behavior over user events. You just need to prefix the official event by __map-__ to bind a callback to it.  

For example, the _click_ or *zoom_changed* event of the [google.maps.Map class](https://developers.google.com/maps/documentation/javascript/reference#Map) can be used through the UI.Event object keys __map-click__ and **map-zoom_changed** :

```html
<section id="map" ng-controller="MapCtrl" >
  <div  ui-map="myMap"ui-options="mapOptions" class="map-canvas" 
        ui-event="{'map-click': 'addMarker($event, $params)', 'map-zoom_changed': 'setZoomMessage(myMap.getZoom())' }"
  ></div>
</section>
```


## Testing

We use Karma and jshint to ensure the quality of the code.  The easiest way to run these checks is to use grunt:

```sh
npm install -g grunt-cli
npm install && bower install
grunt
```

The karma task will try to open Firefox and Chrome as browser in which to run the tests.  Make sure this is available or change the configuration in `test\karma.conf.js`


### Grunt Serve

We have one task to serve them all !

```sh
grunt serve
```

It's equal to run separately:

* `grunt connect:server` : giving you a development server at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).

* `grunt karma:server` : giving you a Karma server to run tests (at [http://localhost:9876/](http://localhost:9876/) by default). You can force a test on this server with `grunt karma:unit:run`.

* `grunt watch` : will automatically test your code and build your demo.  You can demo generation with `grunt build:gh-pages`.
