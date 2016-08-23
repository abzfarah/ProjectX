const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const HtmlWebpackPlugin = require('html-webpack-plugin');

var Rupture = require('rupture');
var Autoprefixer = require('autoprefixer');
var Lost = require('lost');
var FontMagician = require('postcss-font-magician');
var Rucksack = require('rucksack-css');

const NPM_TARGET = process.env.npm_lifecycle_event; //eslint-disable-line no-process-env

var DEV = true;
var FULLMAP = true;
var TEST = false;
if (NPM_TARGET === 'run' || NPM_TARGET === 'run-fullmap') {
    DEV = true;
    if (NPM_TARGET === 'run-fullmap') {
        FULLMAP = true;
    }
}

if (NPM_TARGET === 'test') {
    DEV = false;
    TEST = true;
}

var config = {
    entry: ['babel-polyfill', 'webpack-dev-server/client?http://localhost:8080', './root.jsx', 'index.html'],
    devServer: {
        contentBase: "./dist",
        hot: false
    },
    output: {
        path: 'dist',
        publicPath: 'http://localhost:8080',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules|non_npm_dependencies)/,
                query: {
                    presets: ['react', 'es2015-webpack', 'stage-0'],
                    plugins: ['transform-runtime'],
                    cacheDirectory: DEV
                }
            },

            {
                  test: /\.styl$/,
                  loader: ExtractTextPlugin.extract('style-loader',
                    `css-loader?${JSON.stringify({
                      sourceMap: true,
                      minimize: false,
                      modules: true,
                      localIdentName: true ? '[path][name]--[local]--[hash:base64:5]' : '[hash:base64:4]'
                    })}!stylus-loader`)
                },
            {
                test: /\.json$/,
                exclude: /manifest\.json$/,
                loader: 'json'
            },
            {
                test: /manifest\.json$/,
                loader: 'file?name=files/[hash].[ext]'
            },
            {
                test: /(node_modules|non_npm_dependencies)\/.+\.(js|jsx)$/,
                loader: 'imports',
                query: {
                    $: 'jquery',
                    jQuery: 'jquery'
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.(png|eot|tiff|svg|woff2|woff|ttf|gif|mp3|jpg)$/,
                loaders: [
                    'file?name=files/[hash].[ext]',
                    'image-webpack'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html?attrs=link:href'
            }
        ]
    },
    sassLoader: {
        includePaths: ['node_modules/compass-mixins/lib']
    },
    plugins: [
        new ExtractTextPlugin('web-header.css'),

        new webpack.ProvidePlugin({
            'window.jQuery': 'jquery'
        }),
        new CopyWebpackPlugin([
            {from: 'images/emoji', to: 'emoji'},
            {from: 'images/logo-email.png', to: 'images'},
            {from: 'images/circles.png', to: 'images'},
            {from: 'images/favicon', to: 'images/favicon'},
            {from: 'images/appIcons.png', to: 'images'}
        ]),
        new webpack.LoaderOptionsPlugin({
            minimize: !DEV,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 2,
            children: true
        })
    ],
    resolve: {
        alias: {
            jquery: 'jquery/dist/jquery',
            superagent: 'node_modules/superagent/lib/client'
        },
        modules: [
            'node_modules',
            'non_npm_dependencies',
            path.resolve(__dirname)
        ]
    },

      stylus: {
       use: [Rupture()]
     },

      postcss: function () {
          return [Autoprefixer, Lost, FontMagician, Rucksack];
     }
};

// Development mode configuration
if (DEV) {
    if (FULLMAP) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-cheap-module-source-map';
    }
}

// Production mode configuration
if (!DEV) {
    config.devtool = 'source-map';
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            'screw-ie8': true,
            mangle: {
                toplevel: false
            },
            compress: {
                warnings: false
            },
            comments: false
        })
    );
    config.plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(true)
    );
    config.plugins.push(
        new webpack.optimize.DedupePlugin()
    );
}

// Test mode configuration
if (TEST) {
    config.entry = ['babel-polyfill', './root.jsx'];
    config.target = 'node';
    config.externals = [nodeExternals()];
} else {
    // For some reason this breaks mocha. So it goes here.
    config.plugins.push(
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'head',
            template: 'index.html'
        })
    );
}

module.exports = config;
