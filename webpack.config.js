`use strict`

module.exports = {
  entry: './browser/main.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  context: __dirname,

  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015'] // if you aren't using 'babel-preset-es2015', then omit the 'es2015'
        }
      }
    ]
  }
};
