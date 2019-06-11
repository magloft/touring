const path = require('path')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const dev = argv.mode !== 'production'
  return {
    target: 'web',
    devtool: dev ? 'inline-source-map' : false,
    devServer: { contentBase: './' },
    entry: {
      touring: './src/index.tsx',
      index: './docs/index.js'
    },
    output: {
      path: path.resolve(__dirname, './'),
      library: 'touring',
      libraryExport: 'default',
      libraryTarget: 'umd',
      filename: '[name].js'
    },
    resolve: { extensions: ['.js', '.ts', '.tsx'] },
    module: {
      rules: [
        { test: /\.tsx?$/, use: { loader: 'ts-loader' } },
        { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
        { test: /\.svg/, use: { loader: 'svg-url-loader', options: { encoding: 'base64', stripdeclarations: true } }}
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' }),
      new HtmlWebpackPlugin({
        title: 'touring | Interactive Product Tours',
        template: 'docs/index.ejs',
        filename: 'index.html',
        meta: {
          viewport: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
          description: 'touring is a javascript/preact library that allows you to generate both beautiful and powerful product tours with ease.'
        }
      })
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
          terserOptions: { mangle: true, compress: {} }
        })
      ]
    }
  }
}
