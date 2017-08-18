const gulp = require("gulp");

const ASSET_FILES = [
    "src/assets/**/*.*"
];

gulp.task("move_assets_data", () => {
    return gulp.src(ASSET_FILES)
        .pipe(gulp.dest("dist/assets"));
});

gulp.task("assets", ["move_assets_data"]);
module.exports = "assets";