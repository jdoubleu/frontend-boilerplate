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
gulp.task('compile:javascript:es6', () => {
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
});

gulp.task('compile:styles:scss', () => {
    let stream = gulp.src(dirs.assets.src + '/**/*.scss')
		.pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(autoprefixer({
        	browsers: ['last 2 versions', 'IE 9']
        }));

    if(prod) {
    	let uglify = require('gulp-uglifycss');
    	stream.pipe(uglify());
	} else
		stream.pipe(sourcemaps.write('./'));

	return stream.pipe(gulp.dest(dirs.assets.dist));
});

gulp.task('compile:templates:pug', () => {
	return gulp.src(dirs.assets.src + '/**/*.pug')
		.pipe(pug())
		.pipe(gulp.dest(dirs.assets.dist));
});

gulp.task('compile', ['compile:javascript:es6', 'compile:styles:scss', 'compile:templates:pug']);

// # Linting tasks
gulp.task('lint:javascript:es6', () => {
	let eslint = require('gulp-eslint');
	return gulp.src([dirs.assets.src + '/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('lint:styles:scss', () => {
	let stylelint = require('gulp-stylelint');
	return gulp.src([dirs.assets.src + '/**/*.scss'])
        .pipe(stylelint({
        	failAfterError: false,
			reporters: [
				{formatter: 'string', console: true}
			]
        }));
});

gulp.task('lint', ['lint:javascript:es6', 'lint:styles:scss']);

// # Watcher tasks
gulp.task('watch:compile', ['compile'], () => {
	gulp.watch(dirs.assets.src + '/**/*.scss', ['compile:styles:scss']);
    gulp.watch(dirs.assets.src + '/**/*.js', ['compile:javascript:es6']);
    gulp.watch(dirs.assets.src + '/**/*.pug', ['compile:templates:pug']);
});

gulp.task('watch:lint', ['lint'], () => {
	gulp.watch(dirs.assets.src + '/**/*.scss', ['lint:styles:scss']);
    gulp.watch(dirs.assets.src + '/**/*.js', ['lint:javascript:es6']);
});

gulp.task('watch', ['watch:lint', 'watch:compile']);

// # Default tasks
gulp.task('default', ['watch']);
