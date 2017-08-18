const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");

const CLIENT_FILES = [
    "src/client/*.json", "src/client/**/*.json",
    "src/client/*.js", "src/client/**/*.js",
    "src/client/*.css", "src/client/**/*.css",
    "src/client/*.html", "src/client/**/*.html",
    "!src/client/aot-files/*", "!src/client/aot-files/**/*" 
];
const CLIENT_SRC_DIR = "src/client";
const CLIENT_DEST_DIR = "dist/client";
const CLIENT_TS_CONFIG = "./src/client/tsconfig.json";
const CLIENT_SOURCEMAP_ROOT = "../../src/client"; // This is with resepect to CLIENT_DEST_DIR
const CLIENT_SYSTEM_FILES = "./src/client/systemjs/*.js";
const CLIENT_TASKS = [
    "build_client",
    "move_client_data"
];

const clientTsProject = ts.createProject(CLIENT_TS_CONFIG);


gulp.task("move_client_data", () => {
    return gulp.src(CLIENT_FILES)
        .pipe(gulp.dest(CLIENT_DEST_DIR));
});

gulp.task("move_client_systemjs", () => {
    return gulp.src(CLIENT_SYSTEM_FILES)
        .pipe(gulp.dest(CLIENT_DEST_DIR));
});

gulp.task("build_client", ["move_client_data", "move_client_systemjs"], () => {
    return clientTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(clientTsProject())
        .js
        .pipe(sourcemaps.write(".", { includeContent: true, sourceRoot: CLIENT_SOURCEMAP_ROOT }))
        .pipe(gulp.dest(CLIENT_DEST_DIR));
});

gulp.task("client", ["build_client"]);
module.exports = "client";