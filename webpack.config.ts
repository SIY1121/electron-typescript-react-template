import {
  Configuration,
  HotModuleReplacementPlugin,
  WebpackPluginInstance,
} from 'webpack'
import path from 'path'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import WebpackDevServer from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const isDev = process.env.NODE_ENV === 'development'

const plugins: WebpackPluginInstance[] = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public', 'index.html'),
  }),
]

if (isDev) {
  plugins.unshift(
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin()
  )
}

const config: Configuration = {
  entry: './src/ui/index.tsx',
  mode: isDev ? 'development' : 'production',
  devtool: 'source-map',
  devServer: {
    hotOnly: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}

export default config
