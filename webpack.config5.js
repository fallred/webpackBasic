const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    mode:'none',
    entry: {
        'math': './src/demo5/lib.js',
        'math.min': './src/demo5/lib.js'
    },
    output: {
        path: path.resolve(__dirname, 'build5'),
        filename: 'math.js'
    },
    optimization: {
        minimize: true,
        minimizer: [
            // 可以支持es6,默认的使用TerserPlugin
            new TerserPlugin({
                include: /\.min\.js/
            })
        ]
    },
    output: {
        filename: '[name].js',
        // 配置导出库的名称
        library: 'math',
        libraryExport: 'default',
        // 配置以何种方式导出库,是字符串的枚举类型
        libraryTarget: 'umd'
    }
};