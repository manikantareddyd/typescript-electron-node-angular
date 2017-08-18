let gulp = require("gulp");
let ts = require("gulp-typescript");
let sourcemaps = require("gulp-sourcemaps");


console.log("poop");
let SERVER_FILES = [
    "src/server/*.json", "src/server/**/*.json",
    "src/server/*.js", "src/server/**/*.js"
];
let SERVER_SRC_DIR = "src/server";
let SERVER_DEST_DIR = "dist/server";
let SERVER_TS_CONFIG = "./src/server/tsconfig.json";
let SERVER_SOURCEMAP_ROOT = "../../src/server"; // This is with resepect to SERVER_DEST_DIR

let SERVER_TASKS = [
    "build_server",
    "move_server_data"
];

let serverTsProject = ts.createProject(SERVER_TS_CONFIG);


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

module.exports = SERVER_TASKS;