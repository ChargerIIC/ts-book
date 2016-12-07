var gulp        = require("gulp"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    run         = require("gulp-run"),
    nightwatch  = require('gulp-nightwatch'),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    browserSync = require('browser-sync'),
    karma       = require("karma").server,
    uglify      = require("gulp-uglify"),
    docco       = require("gulp-docco"),
    runSequence = require("run-sequence"),
    header      = require("gulp-header"),
    pkg         = require(__dirname + "/package.json");

gulp.task("lint", function() {
  return gulp.src([
                __dirname + "/source/**/**.ts",
                __dirname + "/test/**/**.test.ts"
              ])
             .pipe(tslint())
             .pipe(tslint.report("verbose"));
});

var tsProject = tsc.createProject({
  removeComments : false,
  noImplicitAny : false,
  target : "ES5",
  module : "commonjs",
  declarationFiles : false
});

gulp.task("build-source", function() {
  return gulp.src(__dirname + "/source/*.ts")
             .pipe(tsc(tsProject))
             .pipe(gulp.dest(__dirname + "/build/source/"));
});

gulp.task("bundle-source", function () {
  var b = browserify({
    standalone : 'demos',
    entries: __dirname + "/build/source/demos.js",
    debug: true
  });

  return b.bundle()
    .pipe(source("demos.js"))
    .pipe(buffer())
    .pipe(gulp.dest(__dirname + "/bundled/source/"));
});

var tsTestProject = tsc.createProject({
  removeComments : false,
  noImplicitAny : false,
  target : "ES5",
  module : "commonjs",
  declarationFiles : false
});

// compile test code
gulp.task("build-test", function() {
  return gulp.src(__dirname + "/test/*.test.ts")
             .pipe(tsc(tsTestProject))
             .js.pipe(gulp.dest(__dirname + "/build/test/"));
});

gulp.task("bundle-test", function () {

  var b = browserify({
    standalone : 'test',
    entries: __dirname + "/build/test/bdd.test.js",
    debug: true
  });

  return b.bundle()
    .pipe(source("bdd.test.js"))
    .pipe(buffer())
    .pipe(gulp.dest(__dirname + "/bundled/test/"));
});


gulp.task("bundle-e2e-test", function () {

  var b = browserify({
    standalone : 'test',
    entries: __dirname + "/build/test/e2e.test.js",
    debug: true
  });

  return b.bundle()
    .pipe(source("e2e.test.js"))
    .pipe(buffer())
    .pipe(gulp.dest(__dirname + "/bundled/e2e-test/"));
});

gulp.task('run-e2e-test', function(){
  return gulp.src('')
    .pipe(nightwatch({
      configFile: __dirname + '/nightwatch.json'
    }));
});

gulp.task("run-unit-test", function(cb) {
  karma.start({
    configFile : __dirname + "/karma.conf.js",
    singleRun: true
  }, cb);
});


gulp.task('serve', function(cb) {
    browserSync({
        port: 8080,
        server: {
            baseDir: "./"
        }
    });

    gulp.watch([
      "./**/*.js",
      "./**/*.css",
      "./index.html"
    ], browserSync.reload, cb);
});

gulp.task('run', function (cb) {
  runSequence(
    "lint",
    ["build-source", "build-test"],
    ["bundle-source", "bundle-test"], //, "bundle-e2e-test"],
    ["run-unit-test"],
    "serve",
    cb);
});
