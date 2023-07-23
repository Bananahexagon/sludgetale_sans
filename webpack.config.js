// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.ts',             // エントリーポイントのファイル
  output: {
    filename: 'bundle.js',             // 出力するファイル名
    path: path.resolve(__dirname, 'dist') // 出力ディレクトリ
  },
  resolve: {
    extensions: ['.ts', '.js']         // TypeScriptとJavaScriptファイルの拡張子を解決
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }, 
    ]
  },
  mode: 'development'                // 開発モードでビルド
};
