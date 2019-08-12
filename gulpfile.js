'use strict';

var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // Gulp task to minify JavaScript files
gulp.task('scripts', function() {
    return gulp.src(['./src/azure-storage-file.min.js',
                      './src/fileupload/vendor/jquery.ui.widget.js',
                      './src/fileupload/tmpl.min.js',
                      './src/fileupload/load-image.all.min.js',
                      './src/fileupload/canvas-to-blob.min.js',
                      './src/fileupload/jquery.fileupload.js',
                      './src/fileupload/jquery.fileupload-process.js',
                      './src/fileupload/jquery.fileupload-image.js',
                      './src/fileupload/jquery.fileupload-audio.js',
                      './src/fileupload/jquery.fileupload-video.js',
                      './src/fileupload/jquery.fileupload-validate.js',
                      './src/fileupload/jquery.fileupload-ui.js',])
        // Concat the scripts
        .pipe(concat('simpleazurefileexplorer.min.js'))
        // Minify the file
        .pipe(uglify())
        // Output
        .pipe(gulp.dest('./dist'))
  });


// Gulp task to minify HTML files
gulp.task('pages', function() {
  return gulp.src(['./src/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'));
});

// Clean output directory
gulp.task('clean', () => del(['dist']));

// Gulp task to minify all files
gulp.task('default', gulp.series('clean', 'scripts', 'pages', function (done) {
  done();
}));