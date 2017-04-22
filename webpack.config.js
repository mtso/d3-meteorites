const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const injectHtml = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.resolve(__dirname, 'app/index.template.html')
})

module.exports = {
  entry: path.resolve(__dirname, 'app/index.js'),
  resolve: { extensions: ['.js', '.json'] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015'
      }
    ]
  },
  plugins: [ injectHtml ],
}