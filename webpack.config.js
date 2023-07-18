const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');  // 自动生成html文件包含项目打包后的js等资源
module.exports = {
	entry: './typeScript/index.ts',
	output: {
		// 虚拟打包路径
		// publicPath: 'typescript',
		path: path.resolve(__dirname, "dist"),
		filename: 'bundle.js'
	},
	// webpack打包使用的模块
	module: {
		// 指定加载规则
		rules: [
			{
				// 指定规则生效的文件
				test: /\.ts$/,
				// 使用的loader
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								[
									"@babel/preset-env",
									{
										// 配置浏览器环境
										targets: {
											"ie": "11"
										},
										// 使用的版本
										"corejs": "3",
										// corejs按需加载
										"useBuiltIns": "usage"
									}
								]
							]
						}
					},
					'ts-loader',
				],
				// 排除文件
				exclude: /node-modules/
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env",
										{
											browsers: "last 2 versions"
										}
									]
								]
							}
						}
					},
					"sass-loader"
				]
			}
		]
	},
	devServer: {
		port: '8080',
		// 静态资源文件夹
		contentBase: 'typescript',
	},
	// 配置webpack插件
	plugins: [
		new htmlWebpackPlugin({
			template: "./index.html"
		})
	],
	// 设置引用模块
	resolve: {
		// 设置作为模块引入的文件
		extensions: ['.ts', '.js']
	}
};