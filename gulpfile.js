var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify');

gulp.task('bundle', function() {
  return browserify('./triqui.js')
    .bundle()
    .pipe(source('triqui.js'))
    .pipe(gulp.dest('./build'));
});