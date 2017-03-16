/**
 * Frontend Boilerplate
 * Webpack configuration file
 *
 * This file will configure and set up and development environment using Webpack (https://webpack.js.org/)
 * while offering build flavors für production.
 *
 * This config is written in ES6 so you need NodeJS 6.4 or higher.
 */

// System Includes
let path = require('path');
let fs = require('fs');

// Tools Includes
let webpack = require('webpack');
let stylelintPlugin = require('stylelint-webpack-plugin');

// Settings
const environments = ['development', 'production'];
const paths = {
	entry: path.resolve(__dirname, 'assets/src/modules/'),
	output: path.resolve(__dirname, 'assets/dist/')
};

// Helper functions
/** Maps input to environment. Order is important and must match environments constant. */
const d = (...envs) => {
	const currentEnv = (i = environments.indexOf(process.env.NODE_ENV)) === -1 ? environments[i = 0] : environments[i];
	return i < envs.length ? envs[i] : (envs.length > 0 ? envs[0] : undefined);
};
/** Cleans an array and filters undefined values. */
const c = (a) => a.filter(e => !typeof e == "undefined");

// Webpack configuration
module.exports = {
	entry: () => {
		let modules = {},
			folders = fs.readdirSync(paths.entry);
		folders.forEach(folder => {
			fs.accessSync(mod = path.resolve(paths.entry, folder, folder + '.js'), fs.constants.F_OK); // Do file check and throw if error happened
			modules[folder] = mod;
		});
		return modules;
	},
	output: {
		path: paths.output,
		filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
	},
	plugins: [
		new stylelintPlugin({
			configFile: path.resolve(__dirname, '.stylelintrc')
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: process.env.NODE_ENV === 'production'
		})
	],
	module: {
        rules: [

        	// ESLint
			{
				test: /\.js$/,
				exclude: /node_modules/,
				enforce: 'pre',
				loader: "eslint-loader",
			},

        	// ECMAScript 6
            {
                test: /\.js$/,
				exclude: [
					/node_modules/
				],
				use: [

					// Babel transpiler
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				]
            },

			// Styles (SCSS)
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",

					// PostCSS
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								// Autoprefixer
								require('autoprefixer')({
									browsers: ["last 2 version"]
								})
							]
						}
					},

					// Sass loader
					{
						loader: "sass-loader"
					}
				]
			}
        ],
    },
};