var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');

gulp.task('build', function () {
    return gulp.src('src/**/*.jsx')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
  gulp.watch('src/**/*.jsx', ['build']);
});
