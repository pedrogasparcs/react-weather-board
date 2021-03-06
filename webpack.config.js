/**
 * Created by PedroGaspar on 09/07/16.
 */

let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

function getDevTool() {
    if (process.env.NODE_ENV !== 'production') {
        return 'source-map'; //enables source map
    }
    return false;
}

let config = {
    entry: {
        main: './src/scripts/main.js'
    },
    output: {
        filename: './dist/scripts/[name].js'
    },
    devtool: getDevTool(),
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'react-hot'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.sass$/,
                loader: "style-loader!css-loader!sass-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('dist/styles/main.css', {
            allChunks: true
        })
    ],
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.json', '.coffee', '.sass', '.css']
    },
    externals: {
        'Config': JSON.stringify(require('./config.json')),
        'Strings': JSON.stringify(require('./strings.json'))
    }
}
if (process.env.NODE_ENV === 'production') {
    config.module.loaders.push (
        {
            test: /\.sass$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass')
        }
    )
    config.plugins.push (
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        })
    );
    config.plugins.push (
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: true
            }
        })
    );
}
module.exports = config;