const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports = {
  mode:'development',
  devtool:"none",
  context: process.cwd(),
  entry: './src/demoSyncFiles/index.js',
  output: {
    path: path.resolve(__dirname, 'buildSyncFiles'),
    filename: 'bundle.js'
  },
  devServer:{
    contentBase:path.resolve(__dirname,'./buildSyncFiles')
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
        include: path.join(__dirname, "src/demoSyncFiles"),
        exclude: /node_modules/
      }
    ]
  },
  plugins: []
};