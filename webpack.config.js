/**
 * Fiename: webpack.config.js
 */

module.exports = {
	context: __dirname + "/app",
	entry: "./app.js",
	output: {
		filename: "app.bundle.min.js",
		path: "./www"
	}
};