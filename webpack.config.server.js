const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  entry: './server.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: [nodeExternals()]
}
