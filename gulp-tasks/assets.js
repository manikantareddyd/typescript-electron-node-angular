const gulp = require("gulp");

const ASSETS_FILES = [
    "src/assets/**/*.*"
];
const ASSETS_DEST = "dist/assets"

gulp.task("move_assets_data", () => {
    return gulp.src(ASSETS_FILES)
        .pipe(gulp.dest(ASSETS_DEST));
});

gulp.task("assets", ["move_assets_data"]);
module.exports = "assets";