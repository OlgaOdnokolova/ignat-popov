'use strict';

module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    sass: {
      style: {
        files: {
          "build/css/style.css": ["source/sass/style.scss"],
          "build/css/normalize.css": ["source/sass/normalize.scss"]
        }
      }
    },

    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/style.css"
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"],
          "build/css/normalize.min.css": ["build/css/normalize.css"]
        }
      }
    },

    csscomb: {
      style: {
        expand: true,
        src: ["source/sass/**/*.scss"]
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "img/**",
            "fonts/**",
            "index.html",
            "corporate.html"
          ],
          dest: "build"
        }]
      }
    },

    clean: {
      build: ["build"]
    },

    concat: {
      options: {
        separator: ";"
      },
      dist: {
        src: ["source/js/script.js"],
        dest: "build/js/script.js"
      }
    },

    uglify: {
      my_target: {
        files: {
          "build/js/script.min.js": ["build/js/script.js"]
        }
      }
    },

    watch: {
      style: {
        files: ["source/sass/**/*.scss", "source/*.html"],
        tasks: ["clean", "copy", "sass", "cmq", "postcss"]
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            "build/css/*.css",
            "build/*.html"
          ]
        },
        options: {
          watchTask: true,
          server: "./build"
        }
      }
    }

  });

  grunt.registerTask("build", [
    "clean",
    "copy",
    "concat",
    "uglify",
    "sass",
    "cmq",
    "postcss",
    "cssmin",
    "imagemin"
  ]);

  grunt.registerTask("default", ["browserSync", "watch"]);

};

