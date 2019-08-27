const path = require('path');
const srcPath = path.resolve(__dirname, 'client');
const publicPath = path.resolve(__dirname, 'server/public');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  entry: './client',
  output: {
    path: publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
            plugins: [
              '@babel/plugin-transform-react-jsx',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    contentBase: publicPath,
    historyApiFallback: true,
    watchContentBase: true,
    stats: 'minimal',
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost/',
        headers: {
          Host: 'tuur.localhost'
        }
      }
    }
  }
};
