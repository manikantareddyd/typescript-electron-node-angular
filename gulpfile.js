// This is the only Javascript File we have written :(
// And it doesn"t use import :(
let gulp = require("gulp");
let ts = require("gulp-typescript");
let sourcemaps = require("gulp-sourcemaps");
let ngc = require('gulp-ngc');
// Files Other than Typescript files that we need
let SERVER_FILES = [
    "src/server/*.json", "src/server/**/*.json",
    "src/server/*.js", "src/server/**/*.js"
];
let CLIENT_FILES = [
    "src/client/**/*.js", "src/client/*.js",
    "src/client/**/*.html", "src/client/*.html",
    "src/client/**/*.json", "src/client/*.json",
    "src/client/**/*.css", "src/client/*.css"
];
let ASSET_FILES = [
    "src/assets/**/*.*"
];


// Typescript Configs!
let serverTsProject = ts.createProject("./src/server/tsconfig.json");
let clientTsProject = ts.createProject("./src/client/tsconfig.json");
let clientTsAOTProject = ts.createProject("./dist/client/tsconfig.json");



// Move Other files into the output directories
gulp.task("move_server_data", () => {
    return gulp.src(SERVER_FILES)
        .pipe(gulp.dest("dist/server"));
});
gulp.task("move_client_data", () => {
    return gulp.src(CLIENT_FILES)
        .pipe(gulp.dest("dist/client"));
});
gulp.task("move_assets_data", () => {
    console.log(clientTsProject)
    console.log(clientTsAOTProject)
    return gulp.src(ASSET_FILES)
        .pipe(gulp.dest("dist/assets"));
});

// Compile Typescript files into output directories
gulp.task("build_server", () => {
    return serverTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(serverTsProject())
        .js
        .pipe(sourcemaps.write(".", { includeContent: true, sourceRoot: "../../src/server" }))
        .pipe(gulp.dest("dist/server"));
});
gulp.task("build_client", () => {
    return clientTsProject.src()
        .pipe(sourcemaps.init())
        .pipe(clientTsProject())
        .js
        .pipe(sourcemaps.write(".", { includeContent: true, sourceRoot: "../../src/client" }))
        .pipe(gulp.dest("dist/client"));
});





//client aot
gulp.task("copy_client_source_files", () => {
    return gulp.src("src/client/**/*.*")
    .pipe(gulp.dest("dist/client"))
})
gulp.task("copy_client_aot_tsconfig", ["copy_client_source_files"], () => {
    return gulp.src("dist/client/aot-files/tsconfig.json")
    .pipe(gulp.dest("dist/client"))
})

gulp.task("build_client_aot_1", ["copy_client_aot_tsconfig"], () => {
    return ngc("dist/client/tsconfig.json");
});

gulp.task("copy_client_aot_files", ["build_client_aot_1"], () => {
    gulp.src("dist/client/aot-files/index.html")
        .pipe(gulp.dest("dist/client"))
    return gulp.src("dist/client/aot-files/main.ts")
        .pipe(gulp.dest("dist/client"))
})

gulp.task("build_client_aot_2", ["copy_client_aot_files"], () => {
    return ngc("dist/client/tsconfig.json");
});

// All The Tasks
var server_tasks = [
    "build_server",
    "move_server_data"
];
var client_tasks = [
    "build_client",
    "move_client_data"
];
var asset_tasks = [
    "move_assets_data"
];
var tasks = server_tasks.concat(client_tasks).concat(asset_tasks);

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
