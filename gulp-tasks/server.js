const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");

const SERVER_FILES = [
    "src/server/*.json", "src/server/**/*.json",
    "src/server/*.js", "src/server/**/*.js"
];
const SERVER_SRC_DIR = "src/server";
const SERVER_DEST_DIR = "dist/server";
const SERVER_TS_CONFIG = "./src/server/tsconfig.json";
const SERVER_SOURCEMAP_ROOT = "../../src/server"; // This is with resepect to SERVER_DEST_DIR

const serverTsProject = ts.createProject(SERVER_TS_CONFIG);

gulp.task("move_server_data", () => {
    return gulp.src(SERVER_FILES)
        .pipe(gulp.dest(SERVER_DEST_DIR));
});

gulp.task("build_server", ["move_server_data"], () => {
    return serverTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(serverTsProject())
        .js
        .pipe(sourcemaps.write(".", { includeContent: true, sourceRoot: SERVER_SOURCEMAP_ROOT }))
        .pipe(gulp.dest(SERVER_DEST_DIR));
});

gulp.task("server", ["build_server"]);
module.exports = "server";