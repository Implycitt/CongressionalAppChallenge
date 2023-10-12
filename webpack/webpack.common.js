const pkg = require("../package.json");

const Webpack = require("webpack");

const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { resolve } = require("path");

const dotenv = require("dotenv");
dotenv.config();

const config = {
    entry: {
        app: resolve(__dirname, `../src/index.js`)
    },

    resolve: {
        extensions: [`.js`, `.mjs`],
        mainFields: [`browser`, `module`, `main`]
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: `babel-loader`,
                    options: {
                        presets: [
                            [`@babel/preset-env`, { targets: `defaults` }]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    `css-loader`,
                    `postcss-loader`
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: `asset/resource`,
                generator: {
                    filename: `assets/img/static/[contenthash:8][ext]`
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: `asset/resource`,
                generator: {
                    filename: `assets/fonts/static/[contenthash:8][ext]`
                }
            }
        ]
    },

    plugins: [
        new Webpack.ProgressPlugin(),
        new Webpack.DefinePlugin({
            APP_VERSION: `"${pkg.version}"`,
            API_KEY: `"${process.env.API_KEY}"`
        }),
        new WebpackManifestPlugin({}),
        new HTMLWebpackPlugin({
            inject: true,
            template: resolve(__dirname, `../public/index.html`),

            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new MiniCSSExtractPlugin({ filename: `assets/css/[name].[contenthash:8].css` }),
    ],

    optimization: {
        runtimeChunk: {
            name: `manifest`
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: `vendor`,
                    chunks: `all`
                }
            }
        },
        minimizer: [
            `...`,
            new CSSMinimizerPlugin({
                minimizerOptions: {
                    preset: [`default`, { discardComments: { removeAll: true } }]
                }
            })
        ]
    },

    performance: {
        hints: false
    },

    stats: `minimal`
};

module.exports = config;
