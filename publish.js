/* jshint node:true */

'use strict';

var fs = require('fs');

module.exports = function() {

  var js_dependencies =[
    'https://rawgithub.com/angular-ui/ui-utils/master/modules/event/event.js',
    'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initCall'
  ];

  return {
    humaName : 'UI.Map',
    repoName : 'ui-map',
    inlineHTML : fs.readFileSync(__dirname + '/demo/demo.html'),
    inlineJS : fs.readFileSync(__dirname + '/demo/demo.js'),
    css: ['demo/demo.css'],
    js : js_dependencies.concat(['dist/ui-map.min.js'])
  };
};
