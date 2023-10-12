const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const CopyPlugin = require("copy-webpack-plugin");

const { resolve } = require("path");

const config = merge.default(common, {
    mode: `production`,

    output: {
        path: resolve(__dirname, `../dist`),
        filename: `assets/js/[name].[chunkhash:8].js`,
        clean: true
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(__dirname, `../public`),
                    to: resolve(__dirname, `../dist`),
                    globOptions: {
                        ignore: [`**/index.html`]
                    }
                },
                resolve(__dirname, "../src/.electron/electron.js"),
                resolve(__dirname, "../package.json"),
            ]
        })
    ]
});

module.exports = config;
