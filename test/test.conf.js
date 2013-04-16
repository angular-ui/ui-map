basePath = '..';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'components/angular/angular.js',
  'components/angular-mocks/angular-mocks.js',
  'src/*.js',
  'test/*Spec.js'
];

// Avoid including minified version of angular and other libs again
exclude = [
  'components/*/*.min.js'
];

singleRun = true;

reporters = [
	'dots'
];