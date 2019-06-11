const path = require('path')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  const dev = argv.mode !== 'production'
  return {
    target: 'web',
    devtool: dev ? 'inline-source-map' : false,
    devServer: { contentBase: './' },
    entry: { touring: './index.tsx' },
    output: {
      path: path.resolve(__dirname, './dist'),
      library: 'touring',
      libraryExport: 'default',
      libraryTarget: 'umd',
      filename: '[name].js'
    },
    resolve: { extensions: ['.js', '.ts', '.tsx'] },
    module: {
      rules: [
        { test: /\.tsx?$/, use: { loader: 'ts-loader' } },
        { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' })
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
