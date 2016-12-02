/**
 * Fiename: webpack.config.js
 */

var webpack = require('webpack');

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
/*	
	plugins: [
      	new webpack.optimize.UglifyJsPlugin({
      		minimize: true, 
      		compress: {
      			warnings: false
      		}
      	})
    ],
*/    
	devServer: {
		historyApiFallback: {
			index: '/index.html'
		}
	}
};