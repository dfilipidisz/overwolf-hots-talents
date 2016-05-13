var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concatCss = require('gulp-concat-css');
var runSequence = require('run-sequence');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var paths = {
  css: ['temp/css/*.css'],
  js: ['temp/js/bundle.js'],
  appImages: ['src/img/Icon.png', 'src/img/rog.png', 'src/img/talent-placeholder.png', 'src/img/hero-portraits.png'],
  talents: ['src/img/talents/*'],
  appIcons: ['src/img/IconMouseOver.png', 'src/img/IconMouseNormal.png'],
  moveStoreImages: ['src/img/Icon.png', 'src/img/Screenshot1.jpg', 'src/img/Screenshot2.jpg', 'src/img/Tile.jpg'],
  moveFonts: ['bower_components/font-awesome/fonts/*.*'],
  moveManifest: ['src/other/manifest.json'],
  moveStoreFiles: ['src/other/store.json', 'src/other/description.txt'],
  moveHtmls: ['src/html/index.html'],
}; 

process.env.NODE_ENV = 'production';

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
    .pipe(cssnano({rebase: false}))
    .pipe(gulp.dest('dist/app/Files'));
});

// ---------- Build JS ---------

gulp.task('buildJs', function(callback) {
  runSequence('transpileJS',
              callback);
});

gulp.task('transpileJS', function(callback) {
  return browserify({entries: './src/js/boot.js', extensions: ['.js'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist/app/Files/js'));
});

gulp.task('buildImages', function(callback) {
  runSequence(['buildAppIcons', 'buildAppImages', 'buildTalents'],
              callback);
});

gulp.task('buildAppImages', function () {
  return gulp.src(paths.appImages)
    .pipe(imagemin([
      imagemin.jpegtran(), 
      imagemin.optipng()
    ]))
    .pipe(gulp.dest('dist/app/Files/img'));
});

gulp.task('buildTalents', function () {
  return gulp.src(paths.talents)
    .pipe(imagemin([
      imagemin.jpegtran(), 
      imagemin.optipng()
    ]))
    .pipe(gulp.dest('dist/app/Files/img/talents'));
});

gulp.task('buildAppIcons', function () {
  return gulp.src(paths.appIcons)
    .pipe(imagemin([
      imagemin.jpegtran(), 
      imagemin.optipng()
    ]))
    .pipe(gulp.dest('dist/app'));
});

// ---------- Move files ---------

gulp.task('moveFiles', function(callback) {
  runSequence(['moveManifest', 'moveStoreFiles', 'moveStoreImages', 'moveChangelog', 'moveHtml', 'moveFontAwesome', 'moveFontAwesomeCSS', 'moveReactSelectCSS', 'moveHintCSS', 'movePureCSS'],
              callback);
});

gulp.task('moveFontAwesome', function(){
  gulp.src(paths.moveFonts, { base: './bower_components/font-awesome' })
  .pipe(gulp.dest('dist/app/Files'));
});

gulp.task('moveFontAwesomeCSS', function(){
  gulp.src(['bower_components/font-awesome/css/font-awesome.min.css'], { base: './bower_components/font-awesome' })
  .pipe(gulp.dest('dist/app/Files'));
});

gulp.task('moveReactSelectCSS', function(){
  gulp.src(['node_modules/react-select/dist/react-select.min.css'], { base: './node_modules/react-select/dist' })
  .pipe(gulp.dest('dist/app/Files/css'));
});

gulp.task('moveHintCSS', function(){
  gulp.src(['bower_components/hint.css/hint.min.css'], { base: './bower_components/hint.css/' })
  .pipe(gulp.dest('dist/app/Files/css'));
});

gulp.task('movePureCSS', function(){
  gulp.src(['bower_components/pure/forms-min.css', 'bower_components/pure/buttons-min.css'], { base: './bower_components/pure/' })
  .pipe(gulp.dest('dist/app/Files/css'));
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

gulp.task('moveHtml', function(){
  gulp.src(paths.moveHtmls, { base: './src/html' })
  .pipe(gulp.dest('dist/app/Files'));
});

// ---------- Clean tasks ---------

gulp.task('preClean', function () {
  return del([
    'dist/**'
  ]);
});

gulp.task('postClean', function () {
  return del([
    'temp/**/*',
    'temp/**'
  ]);
});

// ---------- Main build task ---------

gulp.task('build', function(callback) {
  runSequence('preClean',
              ['buildCss', 'buildJs', 'buildImages', 'moveFiles'],
              'postClean',
              callback);
});

// ---------- Run Tasks ---------

gulp.task('default', [ 'build' ]);