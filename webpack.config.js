// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');
var webpack = require('webpack');


// Constant with our paths
const paths = {
  DIST: path.join(__dirname, '/client/dist'),
  SRC: path.join(__dirname, '/client/src'),
};

// Webpack configuration
module.exports = {
  entry: path.join(paths.SRC, 'app.jsx'),
  output: {
    path: paths.DIST,
    filename: 'bundle.js'
  },
  plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
  ],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : paths.SRC,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
       }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {test: /\.less$/,loader: 'style-loader!css-loader?importLoaders=2&sourceMap&localIdentName=[local]__[hash:base64:5]!less-loader'}, 
      { test: /\.css/, loader: 'style-loader!css-loader?importLoaders=2&sourceMap&localIdentName=[local]__[hash:base64:5]' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  }
};