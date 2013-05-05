basePath = '..';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'components/angular/angular.js',
  'components/angular-mocks/angular-mocks.js',
  'components/angular-ui-utils/modules/event/event.js',
  'src/*.js',
  'test/googlemaps.js',
  'test/*Spec.js'
];

singleRun = true;

// level of logging
// possible values = karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
// CLI --log-level debug
logLevel = LOG_INFO,

reporters = [
	'dots'
];