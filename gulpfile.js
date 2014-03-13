var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect'),
    karma = require('gulp-karma'),
    livereload = require('gulp-livereload');

gulp.task('test', function() {
    // Be sure to return the stream
    //
    // https://github.com/lazd/gulp-karma/issues/9
    return gulp.src('./doesntExistHack')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

gulp.task('styles', function() {
    return gulp.src('./app/assets/sass/styles.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'ios 6', 'android 4'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./app/assets/css'))
        .pipe(connect.reload())
        .pipe(notify({ message: 'Style task completed.' }));
});

gulp.task('connect', connect.server({
    root: ['app'],
    port: 1337,
    livereload: true,
    open: {
        browser: 'Google Chrome' // if not working OS X browser: 'Google Chrome'
    }
}));

gulp.task('html', function () {
    return gulp.src('./app/assets/angular/views/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./app/assets/angular/views/*.html'], ['html']);
    gulp.watch(['./app/assets/sass/*.scss'], ['styles']);
});

gulp.task('serve', ['connect', 'watch']);