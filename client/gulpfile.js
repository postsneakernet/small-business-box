/* gulpfile.js */
/* jshint esversion: 6 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');
var sass = require('gulp-ruby-sass');
var del = require('del');

var pkg = require('./package.json');

var bower = './bower_components/';
var bootstrap = bower + 'bootstrap/dist/';
var jquery = bower + 'jquery/dist/';
var angular = bower + 'angular/';
var angularUiRouter = bower + 'angular-ui-router/release/';
var angularSelect = bower + 'angular-ui-select/dist/';
var angularSanitize = bower + 'angular-sanitize/';
var spin = bower + 'spin.js/';
var angularSpinner = bower + 'angular-spinner/';

var project = './' + pkg.name + '/';
var projectAssets = './project_assets/';
var assets = project + 'assets/';

var gulpfile = 'gulpfile.js';
var app = projectAssets + 'app/';
var scripts = projectAssets + 'js/**/*.js';

var vendorPaths = {
    css: [
            bootstrap + 'css/*',
            angularSelect + '*.css'
    ],
    fonts: bootstrap + 'fonts/*',
    js: [
            bootstrap + 'js/bootstrap.js',
            bootstrap + 'js/bootstrap.min.js',
            angularSelect + 'select.js',
            angularSelect + 'select.min.js',
            jquery + 'jquery.js',
            jquery + 'jquery.min.js',
            angular + 'angular.js',
            angular + 'angular.min.js',
            angularUiRouter + 'angular-ui-router.js',
            angularUiRouter + 'angular-ui-router.min.js',
            angularSanitize + 'angular-sanitize.js',
            angularSanitize + 'angular-sanitize.min.js',
            angularSpinner + 'angular-spinner.js',
            angularSpinner + 'angular-spinner-min.js',
            spin + 'spin.js',
            spin + 'spin.min.js'
    ]
};

var srcPaths = {
    index: projectAssets + 'index.html',
    css: projectAssets + 'css/custom.scss',
    img: [
        projectAssets + 'img/*.jpg',
        projectAssets + 'img/*.png'
    ],
    js: [
            gulpfile,
            app + '**/*.js',
            scripts
    ],
    scripts: scripts,
    app: app + '**/*'
};

var watchPaths = {
    all: [
        srcPaths.index,
        srcPaths.css,
        srcPaths.img,
        srcPaths.js,
        srcPaths.app,
        app + '**/*.html',
        app + '**/*.js'
    ]
};

var dstPaths = {
    css: assets + 'css',
    fonts: assets + 'fonts',
    lib: assets +'lib',
    img: assets + 'img',
    js: assets +'js',
    app: project + 'app',
    root: project
};

gulp.task('clean', function () {
    return del([dstPaths.root + '**']);
});

gulp.task('copyCss', function () {
    gulp.src(vendorPaths.css)
        .pipe(gulp.dest(dstPaths.css));
});

gulp.task('copyFonts', function () {
    gulp.src(vendorPaths.fonts)
        .pipe(gulp.dest(dstPaths.fonts));
});


gulp.task('copyLib', function () {
    gulp.src(vendorPaths.js)
        .pipe(gulp.dest(dstPaths.lib));
});

gulp.task('copyImg', function () {
    gulp.src(srcPaths.img)
        .pipe(gulp.dest(dstPaths.img));
});

gulp.task('copyIndex', function () {
    gulp.src(srcPaths.index)
        .pipe(gulp.dest(dstPaths.root));
});

gulp.task('copy', ['copyCss', 'copyFonts', 'copyLib', 'copyImg', 'copyIndex']);

gulp.task('sass', () =>
    sass(srcPaths.css)
        .on('error', sass.logError)
        .pipe(gulp.dest(dstPaths.css))
);

gulp.task('lint', function () {
    gutil.log('linting src', gutil.colors.magenta('js files...'));
    return gulp.src(srcPaths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
    gulp.watch(watchPaths.all, ['default']);
});

gulp.task('scripts', ['lint'], function () {
    gutil.log('copying', gutil.colors.magenta('src scripts'));
    gulp.src(srcPaths.scripts)
        .pipe(gulp.dest(dstPaths.js));
});

gulp.task('app', ['lint'], function () {
    gutil.log('copying', gutil.colors.magenta('app files'));
    gulp.src(srcPaths.app)
        .pipe(gulp.dest(dstPaths.app));
});

gulp.task('default', ['scripts', 'app', 'sass', 'copy']);
