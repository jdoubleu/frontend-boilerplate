'use strict';

// Requirements
let gulp = require('gulp');
let sourcemaps = require("gulp-sourcemaps");
let babel = require("gulp-babel");
let eslint = require('gulp-eslint');
let autoprefixer = require('gulp-autoprefixer');
let sass = require('gulp-sass');
let stylelint = require('gulp-stylelint');
let pug = require('gulp-pug');
let del = require('del');

// Constants
const PRODUCTION = process.env.NODE_ENV === 'production';
const PATHS = {
	src: 'assets/src',
	dest: 'assets/dist'
};
const FILES = {
	es6: '/**/*.js',
	scss: '/**/*.scss',
	pug: '/**/*.pug'
};

// Tasks
// # General tasks
function clean() {
	return del([PATHS.dest]);
}

// # Compiler functions
function scripts() {
	let stream = gulp.src(PATHS.src + FILES.es6)
		.pipe(sourcemaps.init())
		.pipe(babel())
		.on('error', function(e) {
			console.error(e);
			this.emit('end');
		});

	if(PRODUCTION) {
		let uglify = require('gulp-uglify');
		stream.pipe(uglify({
				preserveComments: 'license'
			}).on('error', function(e) {
			  console.error(e);
			  this.emit('end');
			}));
	} else
		stream.pipe(sourcemaps.write('./'));

	return stream.pipe(gulp.dest(PATHS.dest));
}

function styles() {
	let stream = gulp.src(PATHS.src + FILES.scss)
		.pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(autoprefixer({
        	browsers: ['last 2 versions', 'IE 9']
        }));

    if(PRODUCTION) {
    	let uglify = require('gulp-clean-css');
    	stream.pipe(uglify());
	} else
		stream.pipe(sourcemaps.write('./'));

	return stream.pipe(gulp.dest(PATHS.dest));
}

function templates() {
	return gulp.src(PATHS.src + FILES.pug)
		.pipe(pug())
		.pipe(gulp.dest(PATHS.dest));
}

// # Linter functions
function lintScripts() {
	return gulp.src(PATHS.src + FILES.es6)
        .pipe(eslint())
        .pipe(eslint.format());
}

function lintStyles() {
	return gulp.src(PATHS.src + FILES.scss)
        .pipe(stylelint({
        	failAfterError: false,
			reporters: [
				{
					formatter: 'string',
					console: true
				}
			]
        }));
}

// # Watcher functions
function watch() {
	gulp.watch(PATHS.src + FILES.scss, gulp.parallel(styles, lintStyles));
    gulp.watch(PATHS.src + FILES.es6, gulp.parallel(scripts, lintScripts));
    gulp.watch(PATHS.src + FILES.pug, templates);
}

// Gulp tasks
exports.clean = clean;

let compile = gulp.series(clean, gulp.parallel(scripts, styles, templates));
exports.compile = compile;

let lint = gulp.parallel(lintScripts, lintStyles);
exports.lint = lint;

// # Watcher tasks
exports.watch = watch;

// # Default tasks
gulp.task('default', gulp.series(compile, watch));

// # User Tasks