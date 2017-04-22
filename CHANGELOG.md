# Change Log
All notable changes to this project will be documented in this file.
This project adheres to the `frontend-boilerplate` by `jdoubleu`.

## [2.0.0] - 2017-04-22
### Changed
- Updated gulpjs to version 4 to use its new features and adjusted the gulp tasks

## [1.4.0] - 2017-03-30
### Changed
- Dropped old predefined assets folder structure and enabled a more freer one

## [1.3.0] - 2017-03-25
### Added
- Added pug template compiler

## [1.2.0] - 2017-03-18
### Changed
- Using stylelint instead of sass-lint
- Using jdoubleu's eslint and stylelint config as base config

## [1.1.0] - 2016-11-19
### Added
- Defined sass linting rule nesting-deph
- Removed sass linting rule for leading zeros
- npm postinstall script

### Changed
- License to MIT
- On sass linting error the gulp task won't fail but continue
- editorconfig to use charset utf8 as default
- ci build trigger branch is master only

## [1.0.0] - 2016-08-20
### Added
- Set up basic folder structure
- Initialized npm package and bower package
- Added gulp as assistant build system
- Implemented tasks to compile and lint SCSS and ECMAScript 6