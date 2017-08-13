`use strict`
const webpack = require('webpack')
// LOAD ENV VARIABLES
var dotenv = require('dotenv')
dotenv.load()
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

      { test: /\.css$/,
        loader: "style-loader!css-loader"
      },

      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015'] // if you aren't using 'babel-preset-es2015', then omit the 'es2015'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
    'API_KEY': JSON.stringify(process.env.API_KEY),
    'AUTH_DOMAIN': JSON.stringify(process.env.AUTH_DOMAIN),
    'DATABASE_URL': JSON.stringify(process.env.DATABASE_URL),
    'PROJECT_ID': JSON.stringify(process.env.PROJECT_ID),
    'STORAGE_BUCKET': JSON.stringify(process.env.STORAGE_BUCKET),
    'MESSAGING_SENDER_ID': JSON.stringify(process.env.MESSAGING_SENDER_ID),
    'TONE_ANALYZER': JSON.stringify(process.env.TONE_ANALYZER),
    'STORE_TRANSCRIPT': JSON.stringify(process.env.STORE_TRANSCRIPT)
    }),
  ]
}
