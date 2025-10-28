const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProd = process.argv.includes('--mode=production');
module.exports = {
  entry: './src/index.js',
  devtool: isProd ? undefined : 'inline-source-map',
  output: {
    filename: 'h5p-components.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
        loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'h5p-components.css' })
  ],
};