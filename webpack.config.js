const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => ({
  mode: env && env.production ? 'production' : 'development',
  // devtool: env && env.production ? false : 'source-map',
  // 프로젝트의 진입점(entry) 파일 설정
  entry: {
    index: './src/index.js',  // 첫 번째 페이지용
  },

  // 출력(output) 설정
  output: {
    // 각 페이지별로 번들된 파일을 dist 폴더에 저장
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,  // 빌드 후 dist 폴더를 자동으로 정리
  },

  // 모듈 로딩 규칙
  module: {
    rules: [
      // JavaScript 처리
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      // CSS 처리
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      // 이미지 처리
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',  // 이미지 파일을 별도의 파일로 복사
      },
    ],
  },

  // 플러그인 설정
  plugins: [
    // HTML 템플릿을 dist에 복사하고, JS 번들을 자동으로 삽입
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
  ],

  // 개발 서버 설정
  devServer: {
    static: './dist',
    open: true,  // 서버 실행 시 자동으로 브라우저 열기
  },
});