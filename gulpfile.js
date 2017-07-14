'use strict';
const gulp = require('gulp');
const ts = require('gulp-typescript');
const yml = require('gulp-yml');
let uglify = require('gulp-uglify');
let sourcemaps = require('gulp-sourcemaps');
const JSON_FILES = ['src/*.json', 'src/**/*.json', 'src/*.html', 'src/**/*.html', 'src/*.css', 'src/**/*.css', 'src/*.js', 'src/**/*.js'];
// pull in the project TypeScript config
const serverTsProject = ts.createProject('./src/server/tsconfig.json');
const clientTsProject = ts.createProject('./src/client/tsconfig.json');

gulp.task('serverscripts', () => {
  return serverTsProject.src()
    .pipe(serverTsProject())
    .js
    .pipe(gulp.dest('dist/server'));
});

// gulp.task('clientscripts', () => {
//   return clientTsProject.src()
//     .pipe(clientTsProject())
//     .js
//     .pipe(gulp.dest('dist/client'));
// });

gulp.task('clientscripts', () => {
  return clientTsProject.src()
    .pipe(gulp.dest('dist/client'));
});

gulp.task('data', () => {
  return gulp.src(JSON_FILES)
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['serverscripts', 'clientscripts', 'data'], () => {
  // gulp.watch('src/**/*.{ts, json, html, md}', ['scripts', 'data']);
});

var tasks = ['watch'];

gulp.task('default', tasks);