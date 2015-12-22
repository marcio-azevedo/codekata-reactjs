/// <binding BeforeBuild='default' />

var gulp = require("gulp");
var eslint = require("gulp-eslint");
var babel = require("gulp-babel");
var babelify = require("babelify");
//var browserify = require("browserify");
var babelPresetReact = require("babel-preset-react");
var browserify = require("gulp-browserify");
var gutil = require("gulp-util");
var rename = require("gulp-rename");
var reactify = require("reactify");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var del = require("del");

var paths = {
        assets: "assets/",
        js: "assets/js/",
        jsx: "assets/jsx/",
        jsxfiles: [
            "assets/jsx/app.jsx"
        ]
    };

// Lint JS/JSX files
gulp.task("eslint", function () {
    return gulp.src(paths.jsxfiles)
      .pipe(eslint({
          baseConfig: {
              "ecmaFeatures": {
                  "jsx": true
              }
          }
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task("babelify", function () {
    return gulp.src("assets/jsx/*.jsx")
      .pipe(babel({
          presets: ["react"]
      }))
      .pipe(gulp.dest(paths.js));
});

//gulp.task("babelify", function () {
//    return gulp.src('assets/jsx/*.jsx')
//      .pipe(sourcemaps.init())
//      .pipe(babel())
//      .pipe(concat("app.js"))
//      .pipe(sourcemaps.write("."))
//      .pipe(gulp.dest(paths.js));
//});

gulp.task("browserify", function () {
    var production = gutil.env.type === "production";

    gulp.src(["assets/js/app.js"], { read: false })

        // Browserify, and add source maps if this isn't a production build
        .pipe(browserify({
            debug: !production,
            transform: ["reactify"],
            extensions: [".jsx"]
        }))
        .on("prebundle", function(bundler) {
            // Make React available externally for dev tools
            bundler.require("react");
        })

        // Rename the destination file
        .pipe(rename("bundle.js"))

        // Output to the build directory
        .pipe(gulp.dest("assets/js/"));
});

gulp.task('clean', function () {
    return del([
       // Delete assets/js/app.js
      "assets/js/app.js"
    ]);
});

// browserify -t [ babelify --presets [ react ] ] ./assets/jsx/app.jsx -o ./assets/js/bundle.js

// Watch JS/JSX
gulp.task("watch", function () {
    gulp.watch("assets/jsx/**/*.{js,jsx}", ["default"]);
});

gulp.task("default", ["eslint", "babelify", "browserify"]);


