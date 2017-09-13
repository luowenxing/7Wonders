const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')

module.exports = {
    entry: {
        index: './client/js/index.js'
    },
    devtool: '#eval-source-map',
    output: {
        path:path.resolve(__dirname,"client","dist"),
        filename: '[name].[hash].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader',
                            css: 'vue-style-loader!css-loader'
                        }
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {
                    loader:'babel-loader',
                    options:{
                        "presets": ["env"],
                        "plugins": ["transform-object-rest-spread","transform-es2015-modules-commonjs"]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png)$/,
                use: ['file-loader']
            }
        ]
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'https://other-server.example.com',
                secure: false
            }
        }
    },
    resolve: {
        extensions: [
            '.js',
            '.vue'
        ],
        alias: {
            'vue': 'vue/dist/vue.js',
            'shared':path.resolve(__dirname,'server'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: './client/index.html_vm',
            hash: false
        })
    ]
};