const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const { resolve } = require("path");

const config = merge.default(common, {
    mode: "development",
    devtool: "source-map",

    devServer: {
        devMiddleware: { publicPath: "http://localhost:3000" },
        static: { directory: resolve(__dirname, "../public") },
        historyApiFallback: true,
        port: 3000,
        hot: true
    },

    output: {
        path: resolve(__dirname, "../dist"),
        filename: "assets/js/[name].[chunkhash:8].js",
        clean: true
    }
});

module.exports = config;
