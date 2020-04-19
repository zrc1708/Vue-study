const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const fileinclude = require('gulp-file-include');
const less = require('gulp-less');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// 使用gulp.task方法建立任务
gulp.task('first',function(done){
    // 获取需要处理的文件，然后输出
    console.log('第一个gulp任务被执行了');
    gulp.src('./src/style.css')
        .pipe(gulp.dest('dist/css'))
    done()
})

// html任务
// 1.html文件中的代码的压缩工作
// 2.抽取html文件中的公共代码
gulp.task('htmlmin', () => {
    return gulp.src('./src/*.html')
      .pipe(fileinclude())
      // 压缩
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./dist/'));
});

// css任务
// 1.less语法转换
// 2.css代码的压缩
gulp.task('cssmin', () => {
    return gulp.src('./src/*.less','./src/*.css')
    //将less转css
    .pipe(less())
    //将css压缩
    .pipe(csso())
    .pipe(gulp.dest('./dist/'));
});

// js任务
// 1.es6代码转换
// 2.代码压缩
gulp.task('jsmin', () => {
    return gulp.src('./src/index.js')
    .pipe(babel({
        // 可以判断当前代码的运行环境，将代码转换为当前运行环境所支持的代码
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

// 复制文件夹
gulp.task('copy', () => {
    gulp.src('./src/images/*')
        .pipe(gulp.dest('./dist/images'))
    return gulp.src('./src/videos/*')
        .pipe(gulp.dest('./dist/videos'))
});

// 构建任务
gulp.task('default',gulp.series('htmlmin', 'cssmin', 'jsmin', 'copy'))
