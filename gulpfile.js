'use strict';
let gulp = require('gulp');
let ts = require('gulp-typescript');
let SERVER_FILES = ['src/server/*.json', 'src/server/**/*.json', 'src/server/*.js', 'src/server/**/*.js'];
let CLIENT_FILES = ['src/client/**/*'];
// pull in the project TypeScript config
let serverTsProject = ts.createProject('./src/server/tsconfig.json');

gulp.task('build_server', () => {
    return serverTsProject.src()
        .pipe(serverTsProject())
        .js
        .pipe(gulp.dest('dist/server'));
});

gulp.task('move_server_data', () => {
    return gulp.src(SERVER_FILES)
        .pipe(gulp.dest('dist/server'));
});

var tasks = [
    'build_server',
    'move_server_data'
];

gulp.task('default', tasks);