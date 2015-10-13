var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var webserver =  require('gulp-webserver');

gulp.task('babel', function() {
    browserify('app/scripts/src/app.jsx')
        .transform(babelify)
        .bundle()
        .on('error', function(err){ console.log(err.message); })
        .pipe(source('app.js'))
        .pipe(gulp.dest('app/scripts/build'));
});

gulp.task('sass', function() {
    gulp.src('app/styles/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/styles/css'));
});

gulp.task('watch', function() {
    gulp.watch("app/scripts/src/**/*.jsx", ["babel"]);
    gulp.watch("app/styles/scss/**/*.scss", ["sass"]);
});

gulp.task('server', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      fallback: 'app/index.html',
      open: true
    }));
});

gulp.task('default', ['babel', 'sass', 'watch', 'server']);
