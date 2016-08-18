/**
 * Project gulpfile
 * Adds tasks to compile, lint and minify styles, scripts, etc.
 */

// Requirements
let gulp = require('gulp');
let sourcemaps = require("gulp-sourcemaps");
let babel = require("gulp-babel");
let autoprefixer = require('gulp-autoprefixer');
let sass = require('gulp-sass');

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
gulp.task('compile:javascript:es6', () => {
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

gulp.task('compile:styles:scss', () => {
    return gulp.src(dirs.assets.src.styles + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(autoprefixer({
        	browsers: ['last 2 versions', 'IE 9']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dirs.assets.dist.styles));
});

gulp.task('compile', ['compile:javascript:es6', 'compile:styles:scss']);

// # Watcher tasks
gulp.task('watch:compile', ['compile'], () => {
	gulp.watch(dirs.assets.src.styles + '/**/*.scss', ['compile:styles:scss']);
    gulp.watch(dirs.assets.src.scripts + '/**/*.js', ['compile:javascript:es6']);
});

gulp.task('watch', ['watch:compile']);

// # Default tasks
gulp.task('default', ['watch']);