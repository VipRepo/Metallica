const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('../helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts',
        'styles': './src/global.scss'
    },

    resolve: {
        extensions: [
            '.js', '.ts'
        ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [ 'awesome-typescript-loader?configFileName=config/tsconfig.json', 'angular2-template-loader' ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.scss$/,
                exclude: [ /node_modules/, helpers.root('src', 'global.scss') ],
                use: [ 'to-string-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /global\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!sass-loader'
                })
            },
            {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=image/svg+xml"
    }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: [ 'app', 'vendor', 'polyfills' ]
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src'),
            {}
        ),
        new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
      })
    ]
};
