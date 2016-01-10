var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

var publicPath = 'http://localhost:3000/';

var config = {
  entry: [
    'webpack-dev-server/client?' + publicPath,
    'webpack/hot/only-dev-server',
    './web/static/js/top/app.js'
  ],
  output: {
    path: path.join(__dirname, './priv/static/js'),
    filename: 'app.js',
    publicPath: publicPath,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin,
    new ExtractTextPlugin("app.css")
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader') }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};

module.exports = config;
