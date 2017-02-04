const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const buildPath = path.resolve(__dirname, './dist/app/Files');
const sourcePath = path.join(__dirname, './src');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new HtmlWebpackPlugin({
    template: path.join(sourcePath, 'views/index.html'),

    filename: 'index.html',
  }),
  new ExtractTextPlugin('index.css'),
  new CopyWebpackPlugin([
    { from: 'CHANGELOG.md', to: '../../' },
    { from: 'src/other/manifest.json', to: '../' },
    { from: 'src/other/description.txt', to: '../../store/' },
    { from: 'src/other/store.json', to: '../../store/' },
    { from: 'src/img/Icon.png', to: '../../store/' },
    { from: 'src/img/Tile.jpg', to: '../../store/' },
    { from: 'src/img/Screenshot1.jpg', to: '../../store/' },
    { from: 'src/img/Screenshot2.jpg', to: '../../store/' },
    { from: 'src/img/Screenshot3.jpg', to: '../../store/' },
    { from: 'src/img/Screenshot4.jpg', to: '../../store/' },
    { from: 'src/img/IconMouseNormal.png', to: '../' },
    { from: 'src/img/IconMouseOver.png', to: '../' },
  ]),
];

if (nodeEnv === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
  }));
}

module.exports = {
  entry: {
    main: './src/js/boot.js',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk',
    ],
  },
  output: {
    path: buildPath,
    publicPath: '',
    filename: '[name].js',
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
        use: 'css-loader?minimize=true!sass-loader'
      })
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: ['file-loader', 'image-webpack-loader']
    },
    {
      test: /\.(otf|eot|ttf|woff|woff2)$/i,
      loaders: ['file-loader']
    }],
  },
  plugins,
};
