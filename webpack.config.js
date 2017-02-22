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

// Tools Includes
let webpack = require('webpack');
let stylelintPlugin = require('stylelint-webpack-plugin');

// Webpack configuration
module.exports = {
	entry: './assets/src/scripts/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'assets/dist/scripts/')
	},
	plugins: [
		new stylelintPlugin({
			configFile: path.resolve(__dirname, '.stylelintrc')
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

			// Styles (css-only)
            {
                test: /\.css$/,
				exclude: [
					/node_modules/
				],
				use: [
					// Default webpack style and css loaders
					"style-loader",
					"css-loader"
				]
            },

			// Styles (SCSS)
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",

					// Sass loader
					{
						loader: "sass-loader"
					}
				]
			}
        ],
    },
};