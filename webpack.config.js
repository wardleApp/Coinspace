// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');

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
      }
    ]
  }
};