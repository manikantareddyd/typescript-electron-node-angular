const gulp = require('gulp');
const ts = require('gulp-typescript');
const yml = require('gulp-yml');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('./tsconfig.json');

gulp.task('scripts', () => {
  var tsResult = gulp.src("src/**/*.ts")
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('data', () => {
  return gulp.src(JSON_FILES)
    .pipe(yml())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['scripts', 'data'], () => {
  // gulp.watch('src/**/*.{ts, json, html, md}', ['scripts', 'data']);
});

var tasks = ['watch'];

gulp.task('default', tasks);