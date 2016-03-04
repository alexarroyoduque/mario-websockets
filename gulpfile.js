var gulp = require('gulp')
  , gutil = require('gulp-util')
  , del = require('del')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , minifycss = require('gulp-minify-css')
  , minifyhtml = require('gulp-minify-html')
  , processhtml = require('gulp-processhtml')
  , jshint = require('gulp-jshint')
  , uglify = require('gulp-uglify')
  , connect = require('gulp-connect')
  , server = require('gulp-express')
  , paths;

paths = {
  assets: ['src/assets/**/*', '!src/assets/**/*.psd', '!src/assets/**/*.mp3'],
  css:    'src/css/*.css',
  libs:   [
    'src/bower_components/phaser-official/build/custom/phaser-arcade-physics.min.js'
  ],
  js:     ['src/js/**/*.js'],
  jsScreen:     ['src/js/screen/**/*.js'],
  jsController:     ['src/js/controller/**/*.js'],
  dist:   './dist/',
  distSrc:   './dist/src/'
};

gulp.task('clean', function (cb) {
  return del([paths.dist], cb);
});

gulp.task('copy-assets', ['clean'], function () {
  gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + 'src/assets'))
    .on('error', gutil.log);
});

gulp.task('copy-vendor', ['clean'], function () {
  gulp.src(paths.libs)
    .pipe(gulp.dest(paths.distSrc))
    .on('error', gutil.log);
});

gulp.task('copy-server', ['clean'], function () {
  gulp.src('src/server.js')
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('uglifyScreen', [], function () {
  gulp.src(paths.jsScreen)
    .pipe(concat('screen-scripts.min.js'))
    .pipe(gulp.dest(paths.distSrc))
    .pipe(uglify({outSourceMaps: false}))
    .pipe(gulp.dest(paths.distSrc));
});

gulp.task('uglifyController', [], function () {
  gulp.src(paths.jsController)
    .pipe(concat('controller-scripts.min.js'))
    .pipe(gulp.dest(paths.distSrc))
    .pipe(uglify({outSourceMaps: false}))
    .pipe(gulp.dest(paths.distSrc));
});

gulp.task('minifycss', ['clean'], function () {
 gulp.src(paths.css)
    .pipe(minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.distSrc))
    .on('error', gutil.log);
});

gulp.task('processhtmlIndex', ['clean'], function() {
  gulp.src('src/index.html')
    .pipe(processhtml({}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('processhtmlController', ['clean'], function() {
  gulp.src('src/controller.html')
    .pipe(processhtml({}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('minifyhtmlIndex', ['clean'], function() {
  gulp.src('dist/index.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('minifyhtmlController', ['clean'], function() {
  gulp.src('dist/controller.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('html', function(){
  gulp.src('src/*.html')
    .pipe(connect.reload())
    .on('error', gutil.log);
});

gulp.task('connect', function () {
  connect.server({
    root: [__dirname + '/src'],
    port: 9000,
    livereload: true
  });
});

gulp.task('server', function () {
    server.run(['src/server.js', 'watch']);
});

gulp.task('watch', function () {
  gulp.watch(['./src/index.html', paths.css, paths.js], ['html']);
});

gulp.task('default', ['connect', 'watch']);
gulp.task('build', [
  'clean',
  'copy-assets',
  'copy-vendor',
  'copy-server',
  'uglifyScreen',
  'uglifyController',
  'minifycss',
  'processhtmlIndex',
  'processhtmlController',
  'minifyhtmlIndex',
  'minifyhtmlController'
]);
