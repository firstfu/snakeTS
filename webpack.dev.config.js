const path = require('path')
// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 指定入口文件
  entry: './src/index.ts',
  // 指定打包文件所在目錄
  output: {
    path: path.resolve(__dirname, 'dist'),
    // 打包後文件的名稱
    filename: 'bundle.js',

    // 告訴webpack打包後的JS不使用箭頭函數
    environment: {
      arrowFunction: false
    }
  },

  // ====== 指定webpack打包時要使用模塊 ======
  module: {
    // 指定要加載的規則
    rules: [
      // ---------------------------
      {
        // test指定的是規則生效的文件
        test: /\.ts$/,
        // 要使用的loader
        use: [
          // 配置babel
          {
            // 指定加載器
            loader: 'babel-loader',
            // 配置babel
            options: {
              // 設置預定義的環境
              presets: [
                [
                  // 指定環境的插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    // 要兼容的目標Browser
                    targets: {
                      chrome: '58',
                      ie: '11'
                    },
                    // 指定corejs的版本
                    corejs: '3',
                    // 使用corejs的方式 "usage" 表示按需加載
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          },
          // Typescript loader
          'ts-loader'
        ],
        // 要排除的文件/目錄
        exclude: /node_modules/
      },

      // Typescript loader
      // { test: /\.tsx?$/, loader: 'ts-loader' },

      // ---------------------------
      // 設置less文件的處理(執行的順序從下往上: less-loader -> css-loader -> style-loader )
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 引入postcss(css兼容處理 ex: css前輟prefix)
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    // 兼容Browser
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  // 這行一定要加，否則無法使用export
  resolve: {
    // Add ".ts" and ".tsx" as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js']
  },

  // ====== 配置webpack插件 ======
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
  // devServer: {
  //   contentBase: path.join(__dirname, './dist'),
  //   open: true,
  //   port: 9000
  // }
}
