var webpack = require('webpack');
var path = require("path");

module.exports = {
  entry: [
    '../src/act_main.js'
  ],
  output: {
    path: path.join(__dirname, "preview"),
    publicPath: "preview",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/, loader: 'style-loader!css-loader?{discardComments: {removeAll: true}}'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        // make sure to exclude 3rd party code in node_modules
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          // inline files smaller then 10kb as base64 dataURL
          limit: 10000,
          // fallback to file-loader with this naming scheme
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};
