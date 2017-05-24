var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./app/js/app.js'],
    settings: ['./app/js/settings.js']
  },

  output: {
    path: './app/built',
    filename: '[name].bundle.js',
    publicPath: './built/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' }
    ]
  },

  plugins: [
    new webpack.IgnorePlugin(new RegExp("^(electron|fs|ipcMain|ipcRender|path|nconf)$")),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ]
}
