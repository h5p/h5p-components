const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const isProd = process.argv.includes('--mode=production');


function createConfig(name, entry, libraryType) {
  const config =  {
    entry,
    devtool: isProd ? undefined : 'inline-source-map',
    // experiments: {
    //   outputModule: true, // Enable experimental support for outputting as a module
    // },
    output: {
      filename: name,
      path: path.resolve(__dirname, 'dist'),
      clean: true,
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
        },
        {
          test: /\.svg$/,
          type: 'asset/resource',
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'h5p-components.css' })
    ],
  }

  if (libraryType === 'commonjs-static') {
    config.output.library = {
      type: 'commonjs-static'
    };
  }

  if (libraryType === 'module') {
    config.output.library = {
      type: 'module'
    };
    config.experiments = {
      outputModule: true, // Enable experimental support for outputting as a module
    };
  }
  
  return config;
}

module.exports = [
  createConfig('h5p-components-commonjs.js', './src/entries/dist-commonjs.js', 'commonjs-static'),
  createConfig('h5p-components-module.js', './src/entries/dist-commonjs.js', 'module'),
  createConfig('h5p-components.js', './src/entries/dist.js'),
];