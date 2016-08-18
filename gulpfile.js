/**
 * Project gulpfile
 * Adds tasks to compile, lint and minify styles, scripts, etc.
 */

// Requirements
let gulp = require('gulp');

// Constants
const dirs = {
	assets: {
		src: {
			styles: 'assets/src/styles',
			scripts: 'assets/src/scripts'
		},
		dist: {
			styles: 'assets/dist/styles',
			scripts: 'assets/dist/scripts'
		},
		vendor: 'assets/vendor/'
	}
};

// Tasks