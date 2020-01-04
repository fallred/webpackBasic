const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    context: process.cwd(),
    // 入口
    entry: {
        index: './src/demo2/index.js',
        common: './src/demo2/common.js'
    },
    // 出口
    output: {
        filename: '[name].[hash:8].js',
        // 这个路径必须是绝对路径
        path: path.resolve('./build2')
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin({
            //指定模板文件
            template:'./src/demo2/index.html',
            //产出后的文件名
            filename:'index.html',
            inject: false,
            //为了避免缓存，可以在产出的资源后面添加hash值
            hash: true,
            chunks:['common','index'],
            // 对引入代码块进行排序的模式
            chunksSortMode:'manual'
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'build2'),
        host: 'localhost',
        compress: true,
        port: 8080
    },
    module: {
        // rules: [
        //     {
        //         test: /\.css/,
        //         // loader:['style-loader','css-loader']
        //         use:['style-loader','css-loader']
        //     }
        // ]
        rules: [
            {
                test: /\.css/,
                include: path.resolve(__dirname, 'src/demo2'),
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader',
                    options: {
                        insert:'head'
                    }
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
        ]
    }
}