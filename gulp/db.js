const gulp = require("gulp");
const $ = require("gulp-load-plugins")({ lazy: true });

const { db } = require("./_config");

const src = db.source;
const build = db.build;

function compileDB() {
  return gulp
    .src(src)
    .pipe($.changed(build))
    .pipe(gulp.dest(build));
}

exports.src = src;
exports.default = compileDB;