var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

gulp.task('browserify', function() {
    gulp.src('src/js/main.js')
        .pipe(plumber())
        .pipe(browserify({transform: 'reactify'}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
    gulp.src('src/css/style.css')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('default',['browserify', 'css', 'copy']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});