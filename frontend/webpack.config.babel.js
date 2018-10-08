/* global __dirname */
import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import ZipPlugin from 'zip-webpack-plugin'

const repoRoot = __dirname
const appRoot = path.join(repoRoot, 'app')
const distRoot = path.join(repoRoot, 'dist')
const publicRoot = path.join(repoRoot, 'public')

export default (env, argv) => {
    let mode = argv ? argv.mode : 'development'

    let cssLoaderOptions = {
        modules: true,
        importLoaders: 1,
    }

    const devMode = mode !== 'production'

    let plugins = [
        new CleanWebpackPlugin([distRoot]),
        new HtmlWebpackPlugin({
            title: 'rme-user',
            template: path.join(publicRoot, 'index.html'),
        }),
        new webpack.DefinePlugin({
            __VERSION__ : JSON.stringify(require('./package.json').version),
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
    ]

    if (mode === 'production') {
        plugins = [
            ...plugins,
            new ZipPlugin({
                filename: 'dist.zip',
            }),
        ]

        cssLoaderOptions.camelCase = true
        cssLoaderOptions.localIdentName = '[name]-[local]-[hash:base64:5]'

    } else {
        plugins = [
            ...plugins,
            new StyleLintPlugin({
                files: '**/*.scss',
                syntax: 'scss',
            }),
        ]
    }

    return {
        mode: mode,

        context: appRoot,

        entry: {
            bundle: ['babel-polyfill', path.join(appRoot, 'index.js')],
            vendor: [
                'react', 'react-dom', 'redux', 'lodash',
                'react-helmet', 'react-intl',
                'react-router', 'react-router-dom', 'react-router-redux',
                'history', 'redux-batch-enhancer',
            ],
        },

        output: {
            path: distRoot,
            filename: '[name].[hash].js',
            chunkFilename: '[name].[chunkhash].js',
            publicPath: '/',
        },

        resolve: {
            modules: [
                appRoot,
                'node_modules',
            ],
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'initial',
                        name: 'vendor',
                        test: 'vendor',
                        enforce: true,
                    },
                },
            },
            runtimeChunk: true,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: [
                        appRoot,
                    ],
                    use: 'babel-loader',
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'eslint-loader',
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    use: 'file-loader',
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    include: [
                        appRoot,
                        publicRoot,
                    ],
                    use:[
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: cssLoaderOptions,
                        },
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
            ],
        },

        devtool: (mode === 'development') ? 'source-map' : false,

        devServer: {
            host: '0.0.0.0',
            port: '9010',
            disableHostCheck: true,
            historyApiFallback: true,
            watchOptions: {
                poll: true,
            },
        },
        plugins,
    }
}
