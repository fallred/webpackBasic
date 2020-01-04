const path=require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const bootstrapPath = path.resolve(__dirname,'node_modules/bootstrap/dist/css/bootstrap.css');
const mock = require('./mock');

module.exports = {
    // watch: false,
    mode: 'development',
    context: process.cwd(),
    entry: './src/demo4/index.js',
    output: {
        path: path.resolve(__dirname, 'build4'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js','.jsx','.json','.css','scss','less'],
        modules: [path.resolve(__dirname, 'node_modules')],
        alias:{
            bootstrap:bootstrapPath
        },
    },
    externals: {
        // key模块名 值就是说真正运行的时候从window的哪个属性上取值
        // jquery: 'jQuery',
        // Object
        // lodash : 'lodash',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/demo4/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true
            },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),
        new webpack.ProvidePlugin({
            "_": "lodash"
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname,'src/demo4/assets'),//静态资源目录源地址
            to: path.resolve(__dirname,'build4/assets') //目标地址，相对于output的path目录
        }]),
        new webpack.DefinePlugin({
            AUTHOR: JSON.stringify('genshuixue')
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'build4'),
        host: 'localhost',
        compress: true,
        port: 8080,
        hot: true,
        /* proxy:{
            "/api":"http://localhost:3000"
        } */
        proxy: {
            // http://localhost:8080/api/users
            // http://localhost:3000/users
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {"^/api":""}
            }
        },
        //webpack-dev-sever内部用的也是express  app=express();
        before(app) {
            mock(app);
          }
    },
    module: {
        // 如果说个模块不需要解析
        noParse:/jquery|lodash/,
        rules: [
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader'],
                include:path.join(__dirname,'./src/demo4'),
                exclude:/node_modules/
            },
            {
                test: /\.less/,
                include: path.resolve(__dirname,'./src/demo4'),
                exclude: /node_modules/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                },'css-loader','less-loader']
            },
            {
                test: /\.scss/,
                include: path.resolve(__dirname,'./src/demo4'),
                exclude: /node_modules/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                },'css-loader','sass-loader']
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options:{
                     "presets": ["@babel/preset-env"],
                     "plugins": [
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                     ]
                    }
                },
                include: path.join(__dirname,'./src/demo4'),
                exclude:/node_modules/
            }
        ]
    }
}