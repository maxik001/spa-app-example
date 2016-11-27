/**
 * Fiename: webpack.config.js
 */

module.exports = {
	context: __dirname + "/app",
	entry: "./app.js",
	output: {
		filename: "app.bundle.min.js",
		path: "./www"
	},
	module: {
		loaders: [
	  		{
	  			test: /\.js$/,
	  			exclude: "/(node_modules|bower_components/",
	  			loader: "babel-loader",
	  			query: {
	  				presets: ["react", "es2015"]
	  			}
	  		},
	  		{
	  			test: /\.json$/,
	  			loader: "json-loader"
	  		}
	  	]
	},
	devServer: {
		historyApiFallback: {
			index: '/index.html'
		}
	}
};