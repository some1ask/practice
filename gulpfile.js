

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');

function build() {
    return gulp.src([
            'dev/js/auth.js',
            'dev/js/reg.js',
            'dev/js/addpost.js',
            'dev/js/mainscript.js',
            'dev/js/deletepost.js'
          ])
          .pipe(concat('scripts.js'))
          .pipe(uglify())
          .pipe(gulp.dest('public/js'))
        
}
function watcher(){
    gulp.watch('dev/js/**/*.js', gulp.series(build));
}


gulp.task('default',build,watcher);