"use strict";

const DIR_DEV = "app",
  DIR_PROD = "dist";

import gulp from "gulp";
import sass from "gulp-sass";
import htmlmin from "gulp-htmlmin";

const browserSync = require("browser-sync").create(),
  reload = browserSync.reload;

gulp.task("img", () => {
  return gulp.src([`${DIR_DEV}/assets/img/**/*`])
             .pipe(gulp.dest(`${DIR_PROD}/assets/img`))
             .pipe(reload({ stream: true }));
});

gulp.task("js", () => {
  return gulp.src([`${DIR_DEV}/assets/js/**/*`])
             .pipe(gulp.dest(`${DIR_PROD}/assets/js`))
             .pipe(reload({ stream: true }));
});

gulp.task("sass", () => {
  return gulp.src([`${DIR_DEV}/assets/scss/**/*.scss`])
             .pipe(sass({
               //outputStyle: "compressed"
             }))
             .pipe(gulp.dest(`${DIR_PROD}/assets/css`))
             .pipe(reload({ stream: true }));
});

gulp.task("templates", () => {
  return gulp.src(`${DIR_DEV}/*.html`)
             .pipe(htmlmin({
               caseSensitive: true,
               collapseWhitespace: true,
               quoteCharacter: "\"",
               removeEmptyAttributes: true,
               removeScriptTypeAttributes: true,
               removeStyleLinkTypeAttributes: true
             }))
             .pipe(gulp.dest(`${DIR_PROD}`))
             .pipe(reload({ stream: true }));
});

gulp.task("manifest", () => {
  return gulp.src(`${DIR_DEV}/manifest.json`)
             .pipe(gulp.dest(`${DIR_PROD}`));
});

gulp.task("assets", ["img", "js", "sass", "templates", "manifest"]);

gulp.task("default", ["assets"], () => {

  browserSync.init({
    server: {
      baseDir: `./${DIR_PROD}`
    }
  });

  gulp.watch(`${DIR_DEV}/assets/img/**/*`, ["img"]);
  gulp.watch(`${DIR_DEV}/assets/js/**/*`, ["js"]);
  gulp.watch(`${DIR_DEV}/assets/scss/**/*`, ["sass"]);
  gulp.watch(`${DIR_DEV}/*.html`, ["templates"]);

});
