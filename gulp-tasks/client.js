let gulp = require("gulp");
let ts = require("gulp-typescript");
let sourcemaps = require("gulp-sourcemaps");

let CLIENT_FILES = [
    "src/client/**/*.js", "src/client/*.js",
    "src/client/**/*.html", "src/client/*.html",
    "src/client/**/*.json", "src/client/*.json",
    "src/client/**/*.css", "src/client/*.css"
];
let CLIENT_TASKS = [
    "build_client",
    "move_client_data"
];
let clientTsProject = ts.createProject("./src/client/tsconfig.json");
gulp.task("move_client_data", () => {
    return gulp.src(CLIENT_FILES)
        .pipe(gulp.dest("dist/client"));
});

gulp.task("build_client", () => {
    return clientTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(clientTsProject())
        .js
        .pipe(sourcemaps.write(".", { includeContent: true, sourceRoot: "../../src/client" }))
        .pipe(gulp.dest("dist/client"));
});

module.exports = CLIENT_TASKS;