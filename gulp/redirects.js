const gulp = require("gulp");
const $ = require("gulp-load-plugins")({ lazy: true });

const { redirects } = require("./_config");

const src = redirects.source;
const build = redirects.build;

function redirects() {
  return gulp
    .src(src)
    .pipe($.changed(build))
    .pipe(gulp.dest(build));
}

// exports.src = src;
exports.default = redirects;