var gulp = require('gulp');
var fileInclude = require('gulp-file-include');

gulp.task('default',function(){
    //src和dest的路径都是以gulpfile.js为基寻找的
    gulp.src('../src/client/*.html')
    .pipe(fileInclude({
        prefix:'@@',
        basepath:'@file'
    }))
    .pipe(gulp.dest('../dist'))
})
