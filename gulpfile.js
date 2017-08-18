const gulp = require("gulp");
const servertask = require("./gulp-tasks/server");
const electrontask = require("./gulp-tasks/electron");
const clienttask = require("./gulp-tasks/client");
const assetstask = require("./gulp-tasks/assets");
const cleantask = require("./gulp-tasks/clean");
require("./gulp-tasks/client-aot");

const SERVER_FILES = "src/server/**/*.*";
const CLIENT_FILES = "src/client/**/*.*";
const ASSETS_FILES = "src/assets/**/*.*";

const TASKS = [
    servertask,
    electrontask,
    clienttask,
    assetstask
];

gulp.task("default", TASKS);

gulp.task("watch", TASKS, function () {
    gulp.watch(SERVER_FILES, [servertask]);
    gulp.watch(CLIENT_FILES, [clienttask]);
    gulp.watch(ASSETS_FILES, [assetstask]);
});
