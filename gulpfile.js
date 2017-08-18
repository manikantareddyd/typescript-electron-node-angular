// This is the only Javascript File we have written :(
// And it doesn"t use import :(
let gulp = require("gulp");
let ts = require("gulp-typescript");
let sourcemaps = require("gulp-sourcemaps");
let ngc = require('gulp-ngc');
let rollupconfig = require("./rollup-config");
let rollup = require("rollup-stream");
let source = require('vinyl-source-stream');
let clean = require("gulp-clean");
let plugins = require("gulp-load-plugins")();
let server_tasks = require("./gulp-tasks/server");
require("./gulp-tasks/client");


// Files Other than Typescript files that we need


let ASSET_FILES = [
    "src/assets/**/*.*"
];


// Typescript Configs!

let clientTsAOTProject = ts.createProject("./dist/client/tsconfig.json");



// Move Other files into the output directories

gulp.task("move_assets_data", () => {
    console.log(clientTsProject)
    console.log(clientTsAOTProject)
    return gulp.src(ASSET_FILES)
        .pipe(gulp.dest("dist/assets"));
});

// Compile Typescript files into output directories







//client aot
gulp.task("copy_client_source_files", () => {
    return gulp.src("src/client/**/*.*")
        .pipe(gulp.dest("dist/temp"))
})
gulp.task("copy_client_aot_tsconfig", ["copy_client_source_files"], () => {
    return gulp.src("dist/temp/aot-files/tsconfig.json")
        .pipe(gulp.dest("dist/temp"))
})

gulp.task("build_client_aot_1", ["copy_client_aot_tsconfig"], () => {
    return ngc("dist/temp/tsconfig.json");
});

gulp.task("copy_client_aot_files", ["build_client_aot_1"], () => {
    gulp.src("dist/temp/aot-files/index.html")
        .pipe(gulp.dest("dist/client"))
    return gulp.src("dist/temp/aot-files/main.ts")
        .pipe(gulp.dest("dist/temp"))
});

gulp.task("build_client_aot_2", ["copy_client_aot_files"], () => {
    return ngc("dist/temp/tsconfig.json");
});

gulp.task("rollup", ["build_client_aot_2"], () => {
    return rollup(rollupconfig)
        .pipe(source('main.js'))
        .pipe(gulp.dest('./dist/client'));
});
gulp.task("clean_aot_temp", ["rollup"], () => {
    return gulp.src("dist/temp/", {read: false})
        .pipe(clean());
});

// All The Tasks


var asset_tasks = [
    "move_assets_data"
];
var tasks = client_tasks.concat(asset_tasks);

// Simple Interfaces to compile server and client
gulp.task("server", server_tasks);
gulp.task("client", client_tasks);
gulp.task("assets", asset_tasks);

// Do all
gulp.task("default", tasks);
gulp.task("watch", tasks, function () {
    gulp.watch("src/server/**/*.*", function () {
        // run styles upon changes
        gulp.run("server");
    });
    gulp.watch("src/client/**/*.*", function () {
        // run styles upon changes
        gulp.run("client");
    });
    gulp.watch("src/assets/**/*.*", function () {
        // run styles upon changes
        gulp.run("assets");
    });
});
