const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");

const ELECTRON_FILES = [
    "src/electron/*.json", "src/electron/**/*.json",
    "src/electron/*.js", "src/electron/**/*.js",
    "!src/electron/tsconfig.json",
];
const ELECTRON_SRC_DIR = "src/electron";
const ELECTRON_DEST_DIR = "dist/electron";
const ELECTRON_TS_CONFIG = "./src/electron/tsconfig.json";
const ELECTRON_SOURCEMAP_ROOT = "../../src/electron"; // This is with resepect to ELECTRON_DEST_DIR

const electronTsProject = ts.createProject(ELECTRON_TS_CONFIG);

gulp.task("move_electron_data", () => {
    return gulp.src(ELECTRON_FILES)
        .pipe(gulp.dest(ELECTRON_DEST_DIR));
});

gulp.task("build_electron", ["move_electron_data"], () => {
    return electronTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(electronTsProject())
        .js
        .pipe(sourcemaps.write(".", { includeContent: true, sourceRoot: ELECTRON_SOURCEMAP_ROOT }))
        .pipe(gulp.dest(ELECTRON_DEST_DIR));
});

gulp.task("electron", ["build_electron"]);
module.exports = "electron";