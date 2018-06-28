module.exports= {
	devtool: 'eval-source-map',
	entry: './src/index.js',
	output: {
		path: __dirname+ '/src/dist',
		filename: 'bundle.js'
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env','react']
					}
				},
				exclude: /node_modules/
			},
			{
				test: /(\.css|\.sass)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	}
}