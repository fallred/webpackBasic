const HappyPack = require('happypack');
const path=require('path');
let DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    context:process.cwd(),
    entry: './src/demoHappyPack/index.js',
    output: {
        path: path.resolve(__dirname, 'buildHappyPack'),
        filename: 'bundle.js'
    },
    module: {},
    plugins: [
        new DllReferencePlugin({
            manifest: path.resolve(__dirname, 'buildDll/react.manifest.json')
        }),
        new HappyPack({
            //ID是标识符的意思，ID用来代理当前的happypack是用来处理一类特定的文件的
            id: 'babel',
            use: [{
                loader: 'babel-loader',
                //options=query都是向插件传递参数的
                options: {
                    presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react"],
                    plugins: [
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose": true }],
                    ]
                }
            }]
        }),
        new HappyPack({
            //ID是标识符的意思，ID用来代理当前的happypack是用来处理一类特定的文件的
            id: 'css',
            use: [MiniCssExtractPlugin.loader, 'style-loader','css-loader'],
            threads: 4,//你要开启多少个子进程去处理这一类型的文件
            verbose: true//是否要输出详细的日志 verbose
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'buildHappyPack'),
        host: 'localhost',
        compress: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
                use: ['happypack/loader?id=babel'],
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            {
                test: /\.css$/,
                // 把对 .css 文件的处理转交给 id 为 css 的 HappyPack 实例
                use: ['happypack/loader?id=css']
            }
        ]

    }

}