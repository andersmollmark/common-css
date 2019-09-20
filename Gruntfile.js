module.exports = function (grunt) {


  // Project configuration.
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      copy: {
        iconClasses: {
          expand: true,
          flatten: true,
          src: ['output/icons.data.svg.css'],
          dest: 'src/less/',
          filter: 'isFile',
          rename: function (dest, src) {
            return dest + 'icons.data.svg.less';
          }
        }
      },
      less: {
        development: {
          options: {
            paths: ['src/less']
          },
          files: {
            'src/app/css/vmsFarm.css': 'src/less/vms-farm.less'
          }
        },
        production: {
          options: {
            paths: ['src/less'],
            cleancss: true
            //yuicompress: true
          },
          files: {
            'dist/app/css/vmsFarm.css': 'src/less/vms-farm.less'
          }
        }
      },

      // Empties folders to start fresh
      clean: {
          folders: { // removes entire folders..
              src: ['dist/']
                      },
                  local: { // removes all files recursivly under local_system. Direcories some time fail so we ignore them.
              options: {
                  force: true // needed when deleting outside project root directory
                          },
                      src: ['../local_system/app/**/*.*']
                      }
       },

      grunticon: {
        myIcons: {
          files: [{
            expand: true,
            cwd: 'src/assets/img',
            src: ['*.svg', 'tabs/*/*.svg'],
            dest: 'output'
          }],
          options: {
            enhanceSVG: true,
            tmpPath: process.cwd() + "/output"
          }
        }
      },

      cssmin: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            'dist/app/css/vmsFarm.min.css': ['dist/app/css/vmsFarm.css']
          }
        }
      },
      compress: {
        main: {
          options: {
            mode: 'gzip'
          },
          files: [{
            expand: true,
            src: ['dist/app/js/vmsfarm.js'],
            ext: '.js.gz'
          },
            {
              expand: true,
              src: ['dist/app/css/vmsFarm.min.css'],
              ext: '.min.css.gz'
            },
            {
              expand: true,
              src: ['dist/app/index.html'],
              ext: '.html.gz'
            }
          ]
        }
      }
    }
  );
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-replace');


  grunt.registerTask('build-icon-css', ['grunticon', 'copy:iconClasses', 'less', 'cssmin']);

  // grunt.registerTask('build-css', ['grunticon', 'copy:iconClasses', 'less', 'cssmin']);
};
