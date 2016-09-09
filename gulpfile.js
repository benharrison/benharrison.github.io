var gulp = require('gulp'),
    connect = require('gulp-connect'),
    csslint = require('gulp-csslint'),
    htmlv = require('gulp-html-validator');

gulp.task('serve', function() {
    connect.server();
});

gulp.task('css', function() {
    gulp.src('assets/css/*.css')
        .pipe(csslint())
        .pipe(csslint.formatter());
});

gulp.task('default', ['serve']);