const path = require('path');
module.exports = {
    mode: 'development',
    context: process.cwd(),
    entry: './src/demoChunks1/index.js',
    output: {
        path: path.resolve(__dirname, 'buildChunks'),
        filename: 'bundle.js'
    },
    module: {},
    plugins: [],
    devServer: {
        contentBase: path.resolve(__dirname, 'buildChunks'),
        host: 'localhost',
        compress: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use:['style-loader','css-loader']
                
            }
        ]
    }
}