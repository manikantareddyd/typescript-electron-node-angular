const gulp = require("gulp");
const ts = require("gulp-typescript");
const sourcemaps = require("gulp-sourcemaps");
const ngc = require("gulp-ngc");
const rollupconfig = require("./rollup-config");
const rollup = require("rollup-stream");
const source = require("vinyl-source-stream");
const clean = require("gulp-clean");

const CLIENT_SRC_DIR = "src/client/**/*.*";

const CLIENT_DEST_DIR = "./dist/client";
const CLIENT_BUNDLE_FILE = "main.js";

const CLIENT_COMPILE_TEMP_DIR = "dist/temp";
const CLIENT_COMPILE_TEMP_TSCONFIG = "dist/temp/tsconfig.json";

const CLIENT_AOT_DIR = "src/client/aot-files/";
const CLIENT_AOT_FILES = {
    "index_html": CLIENT_AOT_DIR + "index.html",
    "tsconfig": CLIENT_AOT_DIR + "tsconfig.json",
    "main_ts": CLIENT_AOT_DIR + "main.ts"
};

gulp.task("copy_client_source_files", ["clean_client"], () => {
    return gulp.src(CLIENT_SRC_DIR)
        .pipe(gulp.dest(CLIENT_COMPILE_TEMP_DIR))
})
gulp.task("copy_client_aot_tsconfig", ["copy_client_source_files"], () => {
    return gulp.src(CLIENT_AOT_FILES.tsconfig)
        .pipe(gulp.dest(CLIENT_COMPILE_TEMP_DIR))
})

gulp.task("build_client_aot_1", ["copy_client_aot_tsconfig"], () => {
    return ngc(CLIENT_COMPILE_TEMP_TSCONFIG);
});

gulp.task("copy_client_aot_files", ["build_client_aot_1"], () => {
    gulp.src(CLIENT_AOT_FILES.index_html)
        .pipe(gulp.dest(CLIENT_DEST_DIR))
    return gulp.src(CLIENT_AOT_FILES.main_ts)
        .pipe(gulp.dest(CLIENT_COMPILE_TEMP_DIR))
});

gulp.task("build_client_aot_2", ["copy_client_aot_files"], () => {
    return ngc(CLIENT_COMPILE_TEMP_TSCONFIG);
});

gulp.task("rollup", ["build_client_aot_2"], () => {
    return rollup(rollupconfig)
        .pipe(source(CLIENT_BUNDLE_FILE))
        .pipe(gulp.dest(CLIENT_DEST_DIR));
});
gulp.task("clean_aot_temp", ["rollup"], () => {
    return gulp.src(CLIENT_COMPILE_TEMP_DIR, { read: false })
        .pipe(clean());
});

gulp.task("client_aot", ["clean_aot_temp"]);

module.exports = "client_aot";