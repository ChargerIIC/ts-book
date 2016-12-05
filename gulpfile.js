var gulp = require('gulp');

gulp.task('default', function() {
  console.log('Hello Gulp!');
});

var tslint = require('gulp-tslint');
gulp.task('lint', function() {
  return gulp.src([
   './source/ts/**/**.ts', './test/**/**.test.ts'
 ]).pipe(tslint.report({
      formatter: 'verbose'
    }))
    .pipe(tslint.report());
});

var ts = require('gulp-typescript');
var tsProject = ts.createProject({
    removeComments : true,
    noImplicitAny : true,
    target : 'ES3',
    module : 'commonjs',
    declarationFiles : false
});

gulp.task('tsc', function() {
return gulp.src('./source/ts/**/**.ts')
           .pipe(tsProject())
           .js.pipe(gulp.dest('./temp/source/js'));
});

var tsTestProject = ts.createProject({
    removeComments : true,
    noImplicitAny : true,
    target : 'ES3',
    module : 'commonjs',
    declarationFiles : false
});

gulp.task('tsc-tests', function() {
  return gulp.src('./test/**/**.test.ts')
             .pipe(tsTestProject())
             .js.pipe(gulp.dest('./temp/test/'));
});

var browserify  = require('browserify'),
    transform   = require('vinyl-transform'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps');

var browserified = transform(function(filename) {
  var b = browserify({ entries: filename, debug: true });
  return b.bundle();
});

gulp.task('bundle-js', function () {
  return gulp.src('./temp/source/js/main.js')
             .pipe(browserified)
             .pipe(sourcemaps.init({ loadMaps: true }))
             .pipe(uglify())
             .pipe(sourcemaps.write('./'))
             .pipe(gulp.dest('./dist/source/js/'));
});

gulp.task('bundle-test', function () {
  return gulp.src('./temp/test/**/**.test.js')
             .pipe(browserified)
             .pipe(gulp.dest('./dist/test/'));
});

var Server = require('karma').Server;

gulp.task('karma', function (done) {
  new Server({
    configFile: './karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('bundle', function(cb) {
  runSequence('build', [
    'bundle-js', 'bundle-test'
  ], cb);
});

var browserSync = require('browser-sync');
gulp.task('browser-sync', ['test'], function() {
  browserSync({
    server: {
      baseDir: "./dist"
    }});
  });

  var runSequence = require('run-sequence');
  gulp.task('default', function(cb) {
    runSequence(
      'lint',                      // lint
      ['tsc', 'tsc-tests'],        // compile
      ['bundle-js','bundle-test'], // optimize
      'karma',                      // test
      'browser-sync',              // serve
      cb                           // callback
    );
  });

  return gulp.watch([
    "./dist/source/js/**/*.js",
    "./dist/source/css/**.css",
    "./dist/test/**/**.test.js",
    "./dist/data/**/**",
    "./index.html"
  ], [browserSync.reload]);
