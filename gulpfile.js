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

// Constants
const dirs = {
	assets: {
		src: 'assets/src',
		dist: 'assets/dist',
		vendor: 'assets/vendor/'
	}
};

// Tasks

// # Compile tasks
gulp.task('compile:javascript:es6', () => {
	return gulp.src(dirs.assets.src + '/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.on('error', function(e) {
			console.error(e);
			this.emit('end');
		})
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dirs.assets.dist));
});

gulp.task('compile:styles:scss', () => {
    return gulp.src(dirs.assets.src + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(autoprefixer({
        	browsers: ['last 2 versions', 'IE 9']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dirs.assets.dist));
});

gulp.task('compile:templates:pug', () => {
	return gulp.src(dirs.assets.src + '/**/*.pug')
		.pipe(pug())
		.pipe(gulp.dest(dirs.assets.dist));
});

gulp.task('compile', ['compile:javascript:es6', 'compile:styles:scss', 'compile:templates:pug']);

// # Build tasks
gulp.task('build:javascript', ['compile:javascript:es6'], () => {
	let uglify = require('gulp-uglify');
    return gulp.src(dirs.assets.dist + "/**/*.js")
        .pipe(uglify({
			preserveComments: 'license'
		}).on('error', function(e) {
          console.error(e);
          this.emit('end');
        }))
        .pipe(gulp.dest(dirs.assets.dist));
});

gulp.task('build:styles', ['compile:styles:scss'], () => {
	let uglify = require('gulp-uglifycss');
    return gulp.src(dirs.assets.dist + '/**/*.css')
		.pipe(uglify())
		.pipe(gulp.dest(dirs.assets.dist));
});

gulp.task('build:templates', ['compile:templates:pug']);

gulp.task('build', ['build:javascript', 'build:styles', 'build:templates']);

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
