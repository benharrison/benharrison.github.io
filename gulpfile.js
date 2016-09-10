var gulp = require('gulp');
 
gulp.task('default', ['serve']);

gulp.task('serve', function() {
    var connect = require('gulp-connect');
    connect.server();
});

gulp.task('css', function() {
    var csslint = require('gulp-csslint');
    gulp.src('assets/css/*.css')
        .pipe(csslint())
        .pipe(csslint.formatter())
        ;
});

gulp.task('html', function () {
    var htmlhint = require("gulp-htmlhint");
    gulp.src([
            '*.html',
            '*/*.html',
            '!google*.html'
            ])
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        ;
});

gulp.task('js', function () {
    var jslint = require('gulp-jslint');
    gulp.src(['assets/js/*.js'])
        .pipe(jslint({ /* this object represents the JSLint directives being passed down */ }))
        .pipe(jslint.reporter('stylish'));
});