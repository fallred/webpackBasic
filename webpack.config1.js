const path=require('path');
module.exports = {
    mode: 'development',
    // mode: 'production',
    context:process.cwd(),
    entry: './src/demo1/index.js',
    output: {
        path: path.resolve(__dirname, 'build1'),
        filename: 'bundle.js'
    },
    module: {},
    plugins: [],
    devServer: {
        contentBase: path.resolve(__dirname, 'build1'),
        host: 'localhost',
        compress: true,
        port: 8080
    },
    module: {
        // rules: [
        //     {
        //         test: /\.css/,
        //         loader:['style-loader','css-loader']
        //     }
        // ]
        rules: [
            {
                test: /\.css/,
                use:['style-loader','css-loader']
                
            }
        ]
        // rules: [
        //     {
        //         test: /\.css/,
        //         include: path.resolve(__dirname,'src'),
        //         exclude: /node_modules/,
        //         use: [{
        //             loader: 'style-loader',
        //             options: {
        //                 insert:'top'
        //             }
        //         },'css-loader']
        //     }
        // ]
    }
}