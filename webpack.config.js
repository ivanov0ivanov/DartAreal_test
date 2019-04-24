const path = require ('path');
const webpack = require ('webpack');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require ("mini-css-extract-plugin");
const CleanWebpackPlugin = require ('clean-webpack-plugin');
module.exports = {
    entry: [
        './src/js/bundle.js',
        './src/sass/style.sass'
    ],
    output: {
        filename: 'main.js',
        path: path.resolve (__dirname, 'dist')
    },
    devtool: "source-map",
    devServer: {
        contentBase: './dist',
        stats: 'errors-only'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                modules: false
                            }],
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve (__dirname, 'src/sass'),
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {}
                },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: () => [
                                require ('cssnano') ({
                                    preset: ['default', {
                                        discardComments: {
                                            removeAll: true,
                                        },
                                    }]
                                })
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                include: path.resolve (__dirname, 'src/'),
                use: ['raw-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin (),

        new HtmlWebpackPlugin ({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),

        new MiniCssExtractPlugin ({
            filename: "./css/style.bundle.css",
        }),

        new webpack.ProvidePlugin ({
            jQuery: 'jquery',
            $: 'jquery',
            scrollTabs: 'scroll-tabs',
        })
    ]
};