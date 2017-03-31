'use strict';

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
let pug = require('gulp-pug');
let argv = require('yargs').argv;
let del = require('del');

// Constants
const prod = process.env.NODE_ENV === 'production' || argv.production || argv.prod;
const dirs = {
	assets: {
		src: 'assets/src',
		dist: 'assets/dist',
		vendor: 'assets/vendor/'
	}
};

// Tasks
// # General tasks
gulp.task('clean', () => {
	return del([dirs.assets.dist]);
});

// # Compile tasks
function compileES6() {
	let stream = gulp.src(dirs.assets.src + '/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.on('error', function(e) {
			console.error(e);
			this.emit('end');
		});

	if(prod) {
		let uglify = require('gulp-uglify');
		stream.pipe(uglify({
				preserveComments: 'license'
			}).on('error', function(e) {
			  console.error(e);
			  this.emit('end');
			}));
	} else
		stream.pipe(sourcemaps.write('./'));

	return stream.pipe(gulp.dest(dirs.assets.dist));
}

gulp.task('compile:javascript:es6', compileES6);

function compileSCSS() {
	let stream = gulp.src(dirs.assets.src + '/**/*.scss')
		.pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(autoprefixer({
        	browsers: ['last 2 versions', 'IE 9']
        }));

    if(prod) {
    	let uglify = require('gulp-clean-css');
    	stream.pipe(uglify());
	} else
		stream.pipe(sourcemaps.write('./'));

	return stream.pipe(gulp.dest(dirs.assets.dist));
}

gulp.task('compile:styles:scss', compileSCSS);

function compilePUG() {
	return gulp.src(dirs.assets.src + '/**/*.pug')
		.pipe(pug())
		.pipe(gulp.dest(dirs.assets.dist));
}

gulp.task('compile:templates:pug', compilePUG);

let compile = gulp.series('clean', gulp.parallel(compileES6, compileES6, compilePUG));

gulp.task('compile', compile);

// # Linting tasks
function lintES6() {
	let eslint = require('gulp-eslint');
	return gulp.src([dirs.assets.src + '/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
}

gulp.task('lint:javascript:es6', lintES6);

function lintSCSS() {
	let stylelint = require('gulp-stylelint');
	return gulp.src([dirs.assets.src + '/**/*.scss'])
        .pipe(stylelint({
        	failAfterError: false,
			reporters: [
				{formatter: 'string', console: true}
			]
        }));
}

gulp.task('lint:styles:scss', lintSCSS);

let lint = gulp.parallel(lintES6, lintSCSS);

gulp.task('lint', lint);

// # Watcher tasks
function watchCompile() {
	gulp.watch(dirs.assets.src + '/**/*.scss', compileSCSS);
    gulp.watch(dirs.assets.src + '/**/*.js', compileES6);
    gulp.watch(dirs.assets.src + '/**/*.pug', compilePUG);
}

gulp.task('watch:compile', gulp.series(compile, watchCompile));

function watchLint() {
	gulp.watch(dirs.assets.src + '/**/*.scss', lintSCSS);
    gulp.watch(dirs.assets.src + '/**/*.js', lintES6);
}

gulp.task('watch:lint', gulp.series(lint, watchLint));

let watch = gulp.parallel(watchCompile, watchLint);

gulp.task('watch', watch);

// # Default tasks
gulp.task('default', gulp.series(compile, watch));
