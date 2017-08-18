const gulp = require("gulp");
const clean = require("gulp-clean");

const DIST_DIR = "dist";
const DIST_SERVER_DIR = "dist/server";
const DIST_CLIENT_DIR = "dist/client";
const DIST_ASSETS_DIR = "dist/assets";
const DIST_TEMP_DIR = "dist/temp";
const CLEAN_TASKS = [
    "clean_server",
    "clean_client",
    "clean_assets",
    "clean_temp"
];

gulp.task("clean_server", () => {
    return gulp.src(DIST_SERVER_DIR, { read: false })
        .pipe(clean());
});

gulp.task("clean_client", () => {
    return gulp.src(DIST_CLIENT_DIR, { read: false })
        .pipe(clean());
});

gulp.task("clean_assets", () => {
    return gulp.src(DIST_ASSETS_DIR, { read: false })
        .pipe(clean());
});

gulp.task("clean_temp", () => {
    return gulp.src(DIST_TEMP_DIR, { read: false })
        .pipe(clean());
});

gulp.task("clean", () => {
    return gulp.src(DIST_DIR, { read: false })
        .pipe(clean());
});

module.exports = "clean";