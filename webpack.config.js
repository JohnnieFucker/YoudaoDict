import path from 'path';
import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';

const NODE_ENV = process.env.NODE_ENV || 'dev';

let conf = {
  context: path.join(__dirname),
  entry: {
    './js/bubble': ['./src/script/bubble.js'],
    './js/popup': ['./src/script/popup.js'],
    './js/background': ['./src/script/background.js'],
    './js/options': ['./src/script/options.js']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0']
      }
    }, {
      test: /\.s?css$/,
      loaders: ['style-loader', 'css-loader', `sass-loader?${['outputStyle=compressed'].join('&')}`]
    }, {
      test: /\.(eot|ttf|woff|woff2|svg)$/,
      loader: 'file-loader?name=font/[name].[ext]'
    }, {
      test: /\.pug$/,
      exclude: /node_modules/,
      loader: 'pug-loader'
    }]
  },

  plugins: []
};

if (Object.is(NODE_ENV, 'production')) {
  let plugins = conf.plugins;
  plugins.push(new UglifyJsPlugin({compress: {warnings: false}}));
  conf = {...conf, ...plugins};
} else {
  conf = {
    ...conf,
    debug: true,
    cache: true,
    devtool: 'source-map',
    node: {console: true}
  };
}

export default conf;
