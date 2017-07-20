const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const buildPath = path.resolve(__dirname, './dist/app/Files');
const sourcePath = path.join(__dirname, './src');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({ // 3rd party libs used by only main entrypoint
    name: 'mainvendor',
    chunks: ['main'],
    minChunks: ({ resource }) => /node_modules/.test(resource),
  }),
  new webpack.optimize.CommonsChunkPlugin({ // 3rd party libs used by only widget entrypoint
    name: 'widgetvendor',
    chunks: ['widget'],
    minChunks: ({ resource }) => /node_modules/.test(resource),
  }),
  new webpack.optimize.CommonsChunkPlugin({ // used by both entry points
    name: "runtime",
    //minChunks: Infinity
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new HtmlWebpackPlugin({
    template: path.join(sourcePath, 'assets/html/index.html'),
    filename: 'index.html',
    chunks: ['runtime', 'mainvendor', 'main'],
  }),
  new HtmlWebpackPlugin({
    template: path.join(sourcePath, 'assets/html/widget.html'),
    filename: 'widget.html',
    chunks: ['runtime', 'widgetvendor', 'widget'],
  }),
  new ExtractTextPlugin('[name].[contenthash].css'),
  new CopyWebpackPlugin([
    { from: 'CHANGELOG.md', to: '../../' },
    { from: 'src/assets/manifest.json', to: '../' },
    { from: 'src/assets/description.txt', to: '../../store/' },
    { from: 'src/assets/store.json', to: '../../store/' },
    { from: 'src/assets/img/Icon.png', to: '../../store/' },
    { from: 'src/assets/img/Tile.jpg', to: '../../store/' },
    { from: 'src/assets/img/Screenshot1.jpg', to: '../../store/' },
    { from: 'src/assets/img/Screenshot2.jpg', to: '../../store/' },
    { from: 'src/assets/img/Screenshot3.jpg', to: '../../store/' },
    { from: 'src/assets/img/IconMouseNormal.png', to: '../' },
    { from: 'src/assets/img/IconMouseOver.png', to: '../' },
    { from: 'node_modules/semantic-ui-css/themes', to: './themes' },
    { from: 'node_modules/semantic-ui-css/semantic.min.css', to: './' },
  ]),
];

if (nodeEnv === 'production') {
  plugins.push(new BabiliPlugin());
}

module.exports = {
  entry: {
    main: './src/boot.js',
    widget: './src/widgetboot.js',
  },
  output: {
    path: buildPath,
    publicPath: '',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
      ],
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?minimize=true!sass-loader',
      }),
    },
    {
      test: /\.(jpe?g|png|gif|svg|webp)$/i,
      loaders: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          },
        },
      ],
    },
    {
      test: /\.(otf|eot|ttf|woff|woff2)$/i,
      loaders: ['file-loader'],
    }],
  },
  plugins,
};
