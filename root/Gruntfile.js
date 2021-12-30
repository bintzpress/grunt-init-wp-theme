module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: {
      dev: {
        SCSS_STYLE: 'expanded',
      },
      prod: {
        SCSS_STYLE: 'compressed',
      }
    },
    copy: {
      base: {
        files: [
          {
            expand: true, 
            cwd: 'src/base',
            src: '**/*',
            dest: 'build/<%= pkg.name.toLowerCase() %>/',
            dot: true 
          }
        ]
      },
      javascript: {
        files: [
          {
            expand: true,
            cwd: 'src/js',
            src: '**/*.js',
            dest: 'build/<%= pkg.name.toLowerCase() %>/assets/js'
          }
        ]
      }
    },
    jshint: {
      all: {
        options: {
          esversion: 6
        },
        files: { 
          src: [ 'Gruntfile.js', 'src/js/**/*.js' ]
        }
      }
    },
    clean: {
      build: [ 'build' ],
      dist: [ 'dist' ],
    },
    compress: {
      dist: { 
        options: {
          archive: 'dist/<%= pkg.name.toLowerCase() %>.zip'
        }, 
        files : [
          { expand: true, src: '**/*', cwd: 'build', dot: true }
        ]
      },
    },
    sass: {
      build: {
        options: {
          sourcemap: 'none',
          noCache: true,
          // style can be compressed or expanded
          style: '<%= ENV.SCSS_STYLE %>' 
        },
        files: { 
          'build/<%= pkg.name.toLowerCase() %>/assets/css/style.css': 'src/scss/style.scss'
        } 
     }
   },
   uglify: {
     prod: {
       files: [{
          expand: true,
          cwd: 'src/js',
          src: '**/*.js',
          dest: 'build/<%= pkg.name.toLowerCase() %>/assets/js'
       }]
     },
   },
   shell: {
     wp_deploy: {
       command: [
         'wp theme activate twentytwentyone',
         'wp theme delete <%= pkg.name.toLowerCase() %>',
         'wp theme install dist/<%= pkg.name.toLowerCase() %>.zip',
         'wp theme activate <%= pkg.name.toLowerCase() %>'
       ].join('&&')
     }
   }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('setenv', 'Set environment variables', function() {
    grunt.config('ENV', process.env);
  });

  /* We uglify the javascript */
  grunt.registerTask('build_prod', ['clean:build', 'copy:base', 
    'sass:build', 'uglify:prod', 'compress:dist']);

  /* We copy over the javascript without changing it */
  grunt.registerTask('build_dev', ['clean:build', 'copy:base', 
    'sass:build', 'copy:javascript', 'compress:dist']);

  grunt.registerTask('prod', ['env:prod', 'setenv', 'jshint:all', 'build_prod']);
  grunt.registerTask('dev', ['env:dev', 'setenv', 'jshint:all', 'build_dev']);

  grunt.registerTask('deploy', ['shell:wp_deploy']);

  grunt.registerTask('default', ['dev']);
}; 
