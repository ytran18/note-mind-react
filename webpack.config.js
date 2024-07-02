/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

/** @type {(env: any, arg: {mode: string}) => import('webpack').Configuration} **/
module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production'
    const isAnalyze = Boolean(env?.analyze)
    /** @type {import('webpack').Configuration} **/
    const config = {
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {
                // config alias for webpack
                '@pages': path.resolve(__dirname, './src/pages'),
                '@icons': path.resolve(__dirname, './src/assets/icons'),
                '@images': path.resolve(__dirname, './src/assets/images'),
                '@styles': path.resolve(__dirname, './src/assets/styles'),
                '@components': path.resolve(__dirname, './src/components'),
                '@core': path.resolve(__dirname, './src/core'),
                '@hooks': path.resolve(__dirname, './src/hooks'),
                '@utils': path.resolve(__dirname, './src/utils'),
                '@constants': path.resolve(__dirname, './src/constants'),
            }
        },
        entry: ['./src/index.tsx'],
        module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(s[ac]ss|css)$/, // sass || scss || css
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: !isProduction }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: !isProduction }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: !isProduction }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                    loader: 'file-loader',
                        options: {
                            name: isProduction ? 'static/media/[name].[contenthash:6].[ext]' : '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                    loader: 'file-loader',
                        options: {
                            name: isProduction ? 'static/fonts/[name].[ext]' : '[path][name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
        ]
        },

        output: {
            filename: 'static/js/main.[contenthash:6].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },

        devServer: {
            hot: true,
            port: 5000,
            historyApiFallback: true,
            static: {
                directory: path.resolve(__dirname, 'public', 'index.html'),
                serveIndex: true,
                watch: true
            }
        },
        devtool: isProduction ? false : 'source-map',
        plugins: [
            new MiniCssExtractPlugin({
                filename: isProduction ? 'static/css/[name].[contenthash:6].css' : '[name].css'
            }),

            new Dotenv({
                systemvars: true
            }),

            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'public',
                        to: '.',
                        filter: (name) => {
                            return !name.endsWith('index.html')
                        }
                    }
                ]
            }),

            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                filename: 'index.html'
            }),
        ]
    }

    if (isProduction) {

        config.plugins = [
            ...config.plugins,
            new webpack.ProgressPlugin(), // progress when build

            new CompressionPlugin({
                test: /\.(css|js)$/,
                algorithm: 'brotliCompress'
            }),

            new CleanWebpackPlugin() // clean dist folder before build
        ]

        if (isAnalyze) {
            config.plugins = [...config.plugins, new BundleAnalyzerPlugin()]
        }

        config.optimization = {
            minimizer: [
                `...`,
                new CssMinimizerPlugin()
            ]
        }
    }
    return config
}