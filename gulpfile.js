var gulp = require('gulp'),
    connect = require('gulp-connect'),
    csslint = require('gulp-csslint'),
    htmlhint = require("gulp-htmlhint");
 
gulp.task('default', ['serve']);

gulp.task('serve', function() {
    connect.server();
});

gulp.task('css', function() {
    gulp.src('assets/css/*.css')
        .pipe(csslint())
        .pipe(csslint.formatter())
        ;
});

gulp.task('html', function () {
    gulp.src([
            '*.html',
            '*/*.html',
            '!google*.html'
            ])
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        ;
});
