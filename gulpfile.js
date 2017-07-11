const gulp = require('gulp');
const ts = require('gulp-typescript');
const yml = require('gulp-yml');
const JSON_FILES = ['server/*.json', 'server/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('dist'));
});

gulp.task('data', () => {
  return gulp.src(JSON_FILES)
  .pipe(yml())
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts', 'data'], () => {
  gulp.watch('server/**/*.{ts, json, html, md}', ['scripts', 'data']);
});

var tasks = ['watch'];

gulp.task('default', tasks);