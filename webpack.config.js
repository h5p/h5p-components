const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const isProd = process.argv.includes('--mode=production');
module.exports = {
  entry: "./src/entries/dist.js",
  devtool: isProd ? undefined : 'inline-source-map',
  output: {
    filename: 'h5p-components.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      '...',
      new CssMinimizerPlugin()
    ],
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