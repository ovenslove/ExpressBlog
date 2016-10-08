// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var cssmin=require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


/*js检查任务*/
gulp.task('jshints', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/*Sass转换任务*/
gulp.task('sass', function() {
    gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./public/css'));
});

// 合并，压缩文件
gulp.task('scripts',['jshints'], function() {
    gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./public/js'))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

// 默认任务
gulp.task('default', function(){
    gulp.run( 'sass','scripts');
});

// 监听文件变化

gulp.watch([
    './src/sass/*.scss',
    './src/js/*.js'
], function(){
    gulp.run( 'default');
});
