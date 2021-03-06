const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const injectHtml = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.resolve(__dirname, 'app/index.template.html')
})

const copySvg = new CopyWebpackPlugin([
  {
    context: 'static',
    from: '**/*', 
  },
])

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
      },
      {
        test: /\.svg/,
        exclude: /node_modules/,
        use: {
          loader: 'svg-url-loader',
        },
      }
    ]
  },
  plugins: [
    injectHtml,
    copySvg,
  ],
}