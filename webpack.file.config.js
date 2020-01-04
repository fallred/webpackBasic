const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports = {
  mode:'development',
  devtool:"none",
  context: process.cwd(),
  entry: './src/demoFiles/index.js',
  output: {
    path: path.resolve(__dirname, 'buildFiles'),
    filename: 'bundle.js'
  },
  devServer:{
    contentBase:path.resolve(__dirname,'./buildFiles')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets:["@babel/preset-env"]
          }
        },
        include: path.join(__dirname, "src/demoFiles"),
        exclude: /node_modules/
      }
    ]
  },
  plugins: []
};