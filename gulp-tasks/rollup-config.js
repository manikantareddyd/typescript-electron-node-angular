const nodeResolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const uglify = require("rollup-plugin-uglify");

module.exports = {
    entry: "dist/temp/main.js",
    dest: "dist/client/main.js", // output a single application bundle
    sourceMap: false,
    format: "iife",
    onwarn: function (warning) {
        // Skip certain warnings

        // should intercept ... but doesn"t in some rollup versions
        if (warning.code === "THIS_IS_UNDEFINED") { return; }

        // console.warn everything else
        console.warn(warning.message);
    },
    plugins: [
        nodeResolve({ jsnext: true, module: true }),
        commonjs({
            include: "node_modules/rxjs/**",

        }),
        uglify()
    ]
};