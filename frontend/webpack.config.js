const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/app.js',
  mode: 'development',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    compress: true, // Включить сжатие
    port: 9000, // Порт, на котором будет запущен DevServer
    open: true ,
    historyApiFallback: true,//Когда historyApiFallback установлен в true, все запросы, которые не соответствуют существующим файлам на сервере,
    // будут перенаправлены к index.html, что позволяет вашему SPA правильно обрабатывать клиентский роутинг.
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          
          "style-loader",
   
          "css-loader",
  
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Путь к вашему основному HTML файлу
      filename: 'index.html', // Имя генерируемого файла
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/components', to: 'components' }, // Копирование компонентов
        { from: './src/templates', to: 'templates' },
        { from: './src/static/images', to: 'images' },
        { from: './node_modules/admin-lte/plugins/fontawesome-free/webfonts', to: 'webfonts' },
        { from: './node_modules/@fortawesome/fontawesome-free/css/all.min.css', to: 'css' },
        { from: './node_modules/admin-lte/dist/css/adminlte.min.css', to: 'css' },
        { from: './node_modules/admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css', to: 'css' },
        { from: './node_modules/admin-lte/dist/js/adminlte.min.js', to: 'js' },
        { from: './node_modules/jquery/dist/jquery.min.js', to: 'js' },
        { from: './node_modules/admin-lte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css', to: 'css' },
        { from: './node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js', to: 'js' },
        { from: './node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js', to: 'js' },
      ]
    })
  ],
};