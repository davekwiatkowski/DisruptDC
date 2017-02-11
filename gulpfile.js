/**
 * Requires
 */
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    minify = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

/**
 * Source/src locations
 */
var srcJs = 'src/js/**/*.js',
    srcPugOther = 'src/pug/**/*.pug',
    srcPugIndex = 'src/pug/*.pug',
    srcSass = 'src/sass/**/*.sass';

/**
 * Destination/Distribution locations
 */
var destCss = 'dist/css/',
    destJs = 'dist/js/',
    destHtml = '.';

/**
 * JS task
 */
gulp.task('js', function () {
    return gulp.src(srcJs)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(destJs))
        .pipe(livereload());
});

/**
 * Pug task
 */
gulp.task('pugIndex', function () {
    return gulp.src(srcPugIndex)
        .pipe(pug())
        .pipe(gulp.dest(destHtml))
        .pipe(livereload());
});

/**
 * Pug task
 */
gulp.task('pugOther', function () {
    gulp.src(srcPugOther)
        .pipe(pug())
        .pipe(livereload());
});

/**
 * Sass task
 */
gulp.task('sass', function () {
    return gulp.src(srcSass)
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: 'map'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(gulp.dest(destCss))
        .pipe(livereload());
});


/**
 * Watch task
 */
gulp.task('watch', function () {
    livereload.listen();

    gulp.watch(srcJs, ['js']);
    gulp.watch(srcSass, ['sass']);
    gulp.watch(srcPugOther, ['pugOther', 'pugIndex']);
    gulp.watch(srcPugIndex, ['pugIndex']);
});

/**
 * Main task
 */
gulp.task('default', ['pugOther', 'pugIndex', 'js', 'sass', 'watch']);