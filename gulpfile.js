var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concatCss = require('gulp-concat-css');
var runSequence = require('run-sequence');
var minifyCss = require('gulp-minify-css'); 
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var processhtml = require('gulp-processhtml')
var clean = require('gulp-clean');

var paths = {
  css: ['src/bower_components/bootstrap/dist/css/bootstrap.css', 'temp/css/*.css'],
  js: ['src/bower_components/jquery/dist/jquery.js', 'src/js/index.js'],
  appImages: ['src/img/Icon.png'],
  appIcons: ['src/img/IconMouseOver.png', 'src/img/IconMouseNormal.png'],
  moveStoreImages: ['src/img/Icon.png', 'src/img/Screenshot1.jpg', 'src/img/Tile.jpg'],
  moveFonts: ['src/fonts/*.*'],
  moveManifest: ['src/other/manifest.json'],
  moveStoreFiles: ['src/other/store.json', 'src/other/description.txt']
}; 

// ---------- Build CSS ---------

gulp.task('buildCss', function(callback) {
  runSequence('buildless',
              'concatcss',
              callback);
});

gulp.task('buildless', function () {
  return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('temp/css'));
});

gulp.task('concatcss', function () {
  return gulp.src(paths.css)
    .pipe(concatCss('css/bundle.css', {rebaseUrls: false}))
    .pipe(minifyCss({rebase: false}))
    .pipe(gulp.dest('dist/app/Files'));
});

// ---------- Build JS ---------

gulp.task('buildJs', function(callback) {
  runSequence('uglifyJs',
              callback);
});

gulp.task('uglifyJs', function() {
  return gulp.src(paths.js)
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/app/Files/js'));
});

// ---------- Build Images ---------

gulp.task('buildImages', function(callback) {
  runSequence(['buildAppImages', 'buildAppIcons'],
              callback);
});

gulp.task('buildAppImages', function () {
  return gulp.src(paths.appImages)
    .pipe(imagemin({
      optimizationLevel: 7
    }))
    .pipe(gulp.dest('dist/app/Files/img'));
});

gulp.task('buildAppIcons', function () {
  return gulp.src(paths.appIcons)
    .pipe(imagemin({
      optimizationLevel: 7
    }))
    .pipe(gulp.dest('dist/app'));
});

// ---------- Build HTML ---------

gulp.task('buildHtml', function () {
    return gulp.src('src/index.html')
               .pipe(processhtml())
               .pipe(gulp.dest('dist/app/Files'));
});

// ---------- Move files ---------

gulp.task('moveFiles', function(callback) {
  runSequence(['moveFonts', 'moveManifest', 'moveStoreFiles', 'moveStoreImages', 'moveChangelog'],
              callback);
});

gulp.task('moveFonts', function(){
  gulp.src(paths.moveFonts, { base: './src' })
  .pipe(gulp.dest('dist/app/Files'));
});

gulp.task('moveManifest', function(){
  gulp.src(paths.moveManifest, { base: './src/other' })
  .pipe(gulp.dest('dist/app'));
});

gulp.task('moveStoreFiles', function(){
  gulp.src(paths.moveStoreFiles, { base: './src/other' })
  .pipe(gulp.dest('dist/store'));
});

gulp.task('moveStoreImages', function(){
  gulp.src(paths.moveStoreImages, { base: './src/img' })
  .pipe(gulp.dest('dist/store'));
});

gulp.task('moveChangelog', function(){
  gulp.src('CHANGELOG.md', { base: './' })
  .pipe(gulp.dest('dist'));
});

// ---------- Clean tasks ---------

gulp.task('preClean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('postClean', function () {
  return gulp.src('temp', {read: false})
    .pipe(clean());
});

// ---------- Main build task ---------

gulp.task('build', function(callback) {
  runSequence('preClean',
              ['buildCss', 'buildJs', 'buildImages', 'buildHtml', 'moveFiles'],
              'postClean',
              callback);
});

// ---------- Run Tasks ---------

gulp.task('default', [ 'build' ]);