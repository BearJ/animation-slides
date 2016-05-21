var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync');

gulp.task('emit', function(){
    browserSync.reload();
});
gulp.task('less', function(){
    gulp.src('index.less')
        .pipe(less().on('error', function (e) {
            console.error(e.message);
            this.emit('end');
        }))
        .pipe(postcss([autoprefixer]))
        .pipe(browserSync.reload({stream: true}))
        .pipe(gulp.dest("./css"))
    ;
});
gulp.task('watch', function () {
    gulp.watch(['index.html'], ['emit']);
    gulp.watch(['index.less'], ['less']);
});
gulp.task('default', ['watch'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});