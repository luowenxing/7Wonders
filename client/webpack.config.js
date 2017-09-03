const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')
module.exports = {
    entry: {
        index: './js/index.js'
    },
    devtool: '#eval-source-map',
    output: {
        path:path.resolve(__dirname,"dist"),
        filename: '[name].[hash].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    exclude: /node_modules/,
                    options: {
                        loaders: {
                            js: 'babel-loader',
                            css: 'vue-style-loader!css-loader'
                        }
                    }
                }],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, "../shared")],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-object-rest-spread']
                    }
                }
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
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'index.html_vm',
            hash: false
        })
    ]
};