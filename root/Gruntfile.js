module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: {
      dev: {
      },
      prod: {
      }
    },
    copy: {
      base: {
        files: [
          {
            expand: true, 
            cwd: 'src/base',
            src: '**/*',
            dest: 'build/<%= pkg.name %>/',
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
            dest: 'build/<%= pkg.name %>/assets/js'
          }
        ]
      },
      languages: {
        files: [
          {
            expand: true,
            cwd: 'src/languages',
            src: ['**/*.pot', '**/*.mo', '**/*.po'],
            dest: 'build/<%= pkg.name %>/languages'
          }
        ]
      }
    },
    clean: {
      build: [ 'build' ],
      dist: [ 'dist' ],
    },
    compress: {
      dist: { 
        options: {
          archive: 'dist/<%= pkg.name %>.zip'
        }, 
        files : [
          { expand: true, src: '**/*', cwd: 'build', dot: true }
        ]
      },
    },
    sass: {
      dev: {
        options: {
          sourcemap: 'none',
          noCache: true,
          style: 'expanded' 
        },
        files: { 
          'build/<%= pkg.name %>/assets/css/style.css': 'src/scss/style.scss'
        } 
      },
      prod: {
        options: {
          sourcemap: 'none',
          noCache: true,
          // style can be compressed or expanded
          style: 'compressed' 
        },
        files: { 
          'build/<%= pkg.name %>/assets/css/style.css': 'src/scss/style.scss'
        } 
      }
    },
    uglify: {
      prod: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src: '**/*.js',
          dest: 'build/<%= pkg.name %>/assets/js'
        }]
      },
    },
    shell: {
      wp_deploy: {
        command: [
         'wp theme activate twentytwentyone',
         'wp theme delete <%= pkg.name %>',
         'wp theme install dist/<%= pkg.name %>.zip',
         'wp theme activate <%= pkg.name %>'
        ].join('&&')
      }
    },
    pot: {
      options: {
        text_domain: '<%= pkg.name %>',
        keywords: ['__'],
        language: 'PHP',
        encoding: 'UTF-8',
        dest: 'src/languages/'
      },
      files: {
        src: [ 'src/base/**/*.php' ],
        expand: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-pot');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('setenv', 'Set environment variables', function() {
    grunt.config('ENV', process.env);
  });

  grunt.registerTask('prod', ['env:prod', 'setenv', 'pot', 'clean:build', 'copy:base', 
    'sass:prod', 'uglify:prod', 'copy:languages', 'compress:dist']);

  grunt.registerTask('dev', ['env:dev', 'setenv', 'pot', 'clean:build', 'copy:base', 
    'sass:dev', 'copy:javascript', 'copy:languages', 'compress:dist']);

  grunt.registerTask('deploy', ['shell:wp_deploy']);
  grunt.registerTask('default', ['dev']);
}; 
