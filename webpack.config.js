const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
	entry: {
		main: join(__dirname, './src/index.js'),
		vendor: join(__dirname, './src/vendor.js')
	},
	output: {
		path: join(__dirname, '../johniel-cenabre.github.io/')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					sources: false
				}
			},
      {
        test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'assets/img'
				}
      }
		]
	},
	devtool: false,
	plugins: [
    new HtmlWebpackPlugin({
			showErrors: true,
			cache: true,
			title: 'Portfolio',
			template: join(__dirname, './src/index.html')
    })
	],
  devServer: {
    contentBase: join(__dirname, './dist/'),
    compress: true,
    port: 8000
  }
}

module.exports = config
