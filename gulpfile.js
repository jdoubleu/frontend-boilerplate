/**
 * Project gulpfile
 * Adds tasks to compile, lint and minify styles, scripts, etc.
 */

// Requirements
let gulp = require('gulp');
let sourcemaps = require("gulp-sourcemaps");
let babel = require("gulp-babel");

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

// # Compile tasks
gulp.task("compile:javascript:es6", function () {
	return gulp.src(dirs.assets.src.scripts + '/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.on('error', function(e) {
			console.error(e);
			this.emit('end');
		})
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dirs.assets.dist.scripts));
});