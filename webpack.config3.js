const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    context: process.cwd(),
    // 入口
    entry: {
        index: './src/demo3/index.js',
    },
    // 出口
    output: {
        filename: '[name].[hash:8].js',
        // 这个路径必须是绝对路径
        path: path.resolve('./build3')
    },
    plugins: [
        new HtmlWebpackPlugin({
            //指定模板文件
            template:'./src/demo3/index.html',
            //产出后的文件名
            filename:'index.html',
            inject: false,
            //为了避免缓存，可以在产出的资源后面添加hash值
            hash: true,
            chunks:['index'],
            // 对引入代码块进行排序的模式
            chunksSortMode:'manual'
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'build3'),
        host: 'localhost',
        compress: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                //css-loader是解析 处理css引入的路径
                //style-loader用来把CSS代码转成JS代码，在执行的时候会向页面中注入一个style标签
                use: [{
                    //MiniCssExtractPlugin.loader负责收集所有的 CSS文件
                    loader: MiniCssExtractPlugin.loader
                }, 'css-loader']
            },
            {
                test:/\.(gif|jpg|jpeg|png|bmp|eot|woff|woff2|ttf|svg)$/,
                use:[
                    {
                        loader: 'url-loader',
                        options:{
                            limit: 4096,
                            outputPath: 'images',
                            publicPath: '/images'
                        }
                    }
                ]
            },
        ],
    }
}