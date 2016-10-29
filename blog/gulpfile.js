// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var cssmin=require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
// var imagemin = require('gulp-imagemin');


/*js检查任务*/
gulp.task('jshints', function() {
    gulp.src('./lib/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
/*jade转换任务*/
gulp.task('templates',function(){
    gulp.src('./lib/view/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/view'));
})

/*Sass转换任务*/
gulp.task('sass', function() {
    gulp.src('./sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./public/css'));
});

// 合并，压缩文件
gulp.task('scripts',['jshints'], function() {
    gulp.src('./js/*.js')
        .pipe(gulp.dest('./public/js'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./public/js'));
});

/*/!*image照片压缩*!/
gulp.task('imgmin',function(){
    gulp.src('./public/images/!*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images'));
})*/

// 默认任务
gulp.task('default', function(){
    gulp.run( 'sass', 'scripts');
});

// 监听文件变化

gulp.watch([
    './js/*.js',
    './sass/*.scss'
], function(){
    gulp.run( 'default');
});
