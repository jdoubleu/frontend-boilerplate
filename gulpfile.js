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
	src: 'src',
	dest: 'dist'
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
	} else {
		stream.pipe(sourcemaps.write('./'));
	}

	return stream.pipe(gulp.dest(PATHS.dest));
}

function styles() {
	let stream = gulp.src(PATHS.src + FILES.scss)
		.pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(autoprefixer());

    if(PRODUCTION) {
    	let uglify = require('gulp-clean-css');
    	stream.pipe(uglify());
	} else {
		stream.pipe(sourcemaps.write('./'));
	}

	return stream.pipe(gulp.dest(PATHS.dest));
}

function templates() {
	return gulp.src(PATHS.src + FILES.pug)
		.pipe(pug())
		.pipe(gulp.dest(PATHS.dest));
}

// # Linter functions
function lintScripts() {
	let stream = gulp.src(PATHS.src + FILES.es6)
        .pipe(eslint())
        .pipe(eslint.format());

	if(PRODUCTION) {
		stream = stream.pipe(eslint.failAfterError());
	}

	return stream;
}

function lintStyles() {
	return gulp.src(PATHS.src + FILES.scss)
        .pipe(stylelint({
        	failAfterError: PRODUCTION,
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
clean.description = "Deletes all compile/generated files in destination folder.";
exports.clean = clean;

let compile = gulp.series(clean, gulp.parallel(scripts, styles, templates));
compile.description = "Builds styles and scripts out of ES6 and SCSS files. Also minifies them for production builds.";
exports.compile = compile;

let lint = gulp.parallel(lintScripts, lintStyles);
lint.description = "Lints styles and scripts using stylelint and eslint.";
exports.lint = lint;

// # Watcher tasks
watch.description = "Watches for styles or scripts file changed to compile them.";
exports.watch = watch;

// # Default tasks
let _default = gulp.series(compile, watch);
_default.description = "Initially compiles all styles and scripts, then watches for changes.";
exports.default = _default;

// # User Tasks