const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        pageA: './src/demoChunks2/pageA',
        pageB: './src/demoChunks2/pageB',
        pageC: './src/demoChunks2/pageC'
    },
    output: {
        path: path.resolve(__dirname,'buildChunks2'),
        filename: '[name].js'
    },
    optimization: {
        //分割代码块
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    //最小重复的次数
                    minChunks: 2,
                    //最小提取字节数
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                }
            }
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/demoChunks2/index.html',
            filename: 'pageA.html',
            chunks: ['pageA']
        }),
        new HtmlWebpackPlugin({
            template: './src/demoChunks2/index.html',
            filename: 'pageB.html',
            chunks: ['pageB']
        }),
        new HtmlWebpackPlugin({
            template: './src/demoChunks2/index.html',
            filename: 'pageC.html',
            chunks: ['pageC']
        })
    ]
}