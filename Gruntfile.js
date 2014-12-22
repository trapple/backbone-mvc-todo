module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      dev: {
        files: ["app/index.html", "app/css/*.css", "app/js/*js"]
      },
      options: {
        livereload: true
      }
    },
    connect: {
      server: {
        options: {
          base: 'app/',
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['connect:server', 'watch:dev']);

};
