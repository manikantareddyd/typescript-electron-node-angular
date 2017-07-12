'use strict';
const gulp = require('gulp');
const ts = require('gulp-typescript');
const yml = require('gulp-yml');
let uglify = require('gulp-uglify');
let sourcemaps = require('gulp-sourcemaps');
const JSON_FILES = ['src/*.json', 'src/**/*.json', '!tsconfig.json'];

// pull in the project TypeScript config
const serverTsProject = ts.createProject('./src/server/tsconfig.json');

gulp.task('serverscripts', () => {
  return serverTsProject.src()
    .pipe(sourcemaps.init())
    .pipe(serverTsProject())
    .js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/server'));
});

gulp.task('data', () => {
  return gulp.src(JSON_FILES)
    .pipe(yml())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['serverscripts', 'data'], () => {
  // gulp.watch('src/**/*.{ts, json, html, md}', ['scripts', 'data']);
});

var tasks = ['watch'];

gulp.task('default', tasks);