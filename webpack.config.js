const path = require('path');
const webpack = require('webpack');
const packageJson = require("./package.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Generates an html file
const scssToPostcssVariables = require('./tools/scss-to-postcss-variables');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');



const postCssPresetEnv = require('postcss-preset-env');
const colorFunction = require("postcss-color-function");



// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;





// Detect if `webpack-dev-server` is calling this config
// const isDevServer = (/webpack-dev-server$/i).test(process.argv[ 1 ]);

const cssVariables = scssToPostcssVariables(path.join(__dirname, './src/theme/variables.scss'));

const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: true,
        data: '@import "./src/theme/variables.scss";', // Injects global sass variables into all sass modules
    }
};

const resolveUrlLoader = {
    loader: 'resolve-url-loader',
    options: {
        sourceMap: true,
        keepQuery: true
    }
};

const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: true
    }
};

const cssModuleLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: true,
        modules: true,
        importLoaders: 1,
        localIdentName: '[name]--[local]--[hash:base64:5]'
    }
};

const postCssLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
        sourceComments: true,
        plugins: () => [
            postCssPresetEnv(
                {
                    stage: 0,
                    features: {
                        'custom-properties': {
                            preserve: false,
                            appendVariables: true,
                            variables: cssVariables
                        }
                    }
                }
            ),
            colorFunction()
        ]
    }
};

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'hermes.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        // Compile ES2017 and JSX Syntax to ES5. Want to use babel-preset-env
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: packageJson.babel.presets,
                            plugins: packageJson.babel.plugins
                        }
                    }
                ]
            },
            {
                // Compile our own SASS and CSS
                test: /(\.s?css)$/,
                exclude: /node_modules\/react-toolbox|theme\.s?css/,
                use: [ MiniCssExtractPlugin.loader, cssLoader, postCssLoader, resolveUrlLoader, sassLoader ]
            },
            {
                // Compile the react toolbox CSS Modules and our sass theme together
                test: /(\.s?css)$/,
                include: /node_modules\/react-toolbox|theme\.s?css/,
                use: [ MiniCssExtractPlugin.loader, cssModuleLoader, postCssLoader, resolveUrlLoader, sassLoader ]
            },
            {
                // Move fonts
                test: /\.woff$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './fonts/[name].[ext]?[hash:7]'
                        }
                    }
                ]
            },

            {
                // Move images
                test: /\.(png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './img/[name].[ext]?[hash:7]'
                        }
                    }
                ]
            },

            {
                test: /\.(pdf)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            'src'
        ],

        alias: {
            theme: path.join(__dirname, '/../src/theme'),
            moment$: 'moment-mini'
        }
    },
    // Customize the webpack "build" cli output
    stats: {
        assets: true,
        children: false,
        chunks: false,
        colors: false,
        errors: true,
        errorDetails: false,
        hash: true,
        modules: false,
        performance: false,
        version: false
    },
    // Generate a production quality source map
    devtool: 'source-map',
    // Webpack Dev Server properties
    devServer: {
        hot: false,
        inline: true,
        historyApiFallback: true,
        port: 3000,
        disableHostCheck: true,
        contentBase: path.join(__dirname, "dist"),
        proxy: {
            "/Amp": {
                target: "http://localhost:3001"
            }
        },
        // Customize the devserver "start" cli output
        stats: {
            assets: false,
            children: false,
            chunks: false,
            colors: true,
            errors: true,
            errorDetails: false,
            hash: true,
            modules: false,
            performance: false,
            version: false
        }
    },
    plugins:[
        // Generates an external single css file as output
        new MiniCssExtractPlugin({ filename: 'hermes.css' }),
        // NOTE: Dedupe CSS caused by sass-loader + css modules from react-toolbox. This causes us to lose the css source
        // map files but without it, dev tools slows to a crawl...
        new OptimizeCssAssetsPlugin(),
        new HtmlWebpackPlugin({
            title: ({
                hermes: 'Hermes',
            }),
            template: './src/theme/index.html',
            // favicon: './src/theme/favicon.ico',
            hash: true
        })
        // new webpack.DefinePlugin({
        //     '__RELEASE__': JSON.stringify(packageJson.release),
        //     '__VERSION__': JSON.stringify(packageJson.version)
        // })
    ]
};