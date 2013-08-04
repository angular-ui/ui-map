module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'karma:unit']);
  grunt.registerTask('build-doc', ['uglify', 'copy']);
  grunt.registerTask('server', ['karma:start']);

  var testConfig = function (configFile, customOptions) {
    var options = { configFile: configFile, singleRun: true };
    var travisOptions = process.env.TRAVIS && { browsers: [ 'Firefox', 'PhantomJS'], reporters: ['dots'] };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };


  // Project configuration.
  grunt.initConfig({
    bower: 'bower_components',
    dist: '<%= bower %>/angular-ui-docs',
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''].join('\n'),
      view: {
        humaName: "UI.Map",
        repoName: "ui-map",
        demoHTML: grunt.file.read("demo/demo.html"),
        demoJS: grunt.file.read("demo/demo.js"),
        css: [
          'assets/css/demos.css'
        ],
        js: [
          'https://rawgithub.com/angular-ui/ui-utils/master/modules/event/event.js',
          'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initCall',
          'build/ui-map.js'
        ]
      }
    },
    watch: {
      karma: {
        files: ['ui-map.js', 'test/*.js'],
        tasks: ['karma:unit:run'] //NOTE the :run flag
      }
    },
    karma: {
      unit: testConfig('test/karma.conf.js'),
      start: {configFile: 'test/karma.conf.js'}
    },
    jshint: {
      files: ['<%= meta.view.repoName %>.js', 'gruntFile.js', 'test/**/*Spec.js', 'demo/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globals: {}
      }
    },
    uglify: {
      options: {banner: '<%= meta.banner %>'},
      build: {
        files: {
          '<%= dist %>/build/<%= meta.view.repoName %>.min.js': ['<%= meta.view.repoName %>.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          {src: ['<%= meta.view.repoName %>.js'], dest: '<%= dist %>/build/<%= meta.view.repoName %>.js', filter: 'isFile'},
          {src: ['demo/demo.html'], dest: '<%= dist %>/demos.html', filter: 'isFile'},
          {src: ['demo/demo.css'], dest: '<%= dist %>/assets/css/demos.css', filter: 'isFile'}
        ]
      },
      template: {
        options: {processContent: function (content) {
          return grunt.template.process(content);
        }},
        files: [
          {src: ['<%= dist %>/.tmpl/index.tmpl'], dest: '<%= dist %>/index.html'}
        ]
      }
    }
  });

};