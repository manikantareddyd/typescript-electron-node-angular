const gulp = require("gulp");
const clean = require("gulp-clean");

const DEST_DIR = "dist";
const DEST_SERVER_DIR = "dist/server";
const DEST_CLIENT_DIR = "dist/client";
const DEST_ASSETS_DIR = "dist/assets";
const DEST_TEMP_DIR = "dist/temp";
const CLEAN_TASKS = [
    "clean_server",
    "clean_client",
    "clean_assets",
    "clean_temp"
];

gulp.task("clean_server", () => {
    return gulp.src(DEST_SERVER_DIR, { read: false })
        .pipe(clean());
});

gulp.task("clean_client", () => {
    return gulp.src(DEST_CLIENT_DIR, { read: false })
        .pipe(clean());
});

gulp.task("clean_assets", () => {
    return gulp.src(DEST_ASSETS_DIR, { read: false })
        .pipe(clean());
});

gulp.task("clean_temp", () => {
    return gulp.src(DEST_TEMP_DIR, { read: false })
        .pipe(clean());
});

gulp.task("clean", () => {
    return gulp.src(DEST_DIR, { read: false })
        .pipe(clean());
});

module.exports = "clean";