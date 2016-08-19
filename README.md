# Frontend Boilerplate
This repository contains another simple but powerful boilerplate for creating frontend themes. 
It sets up a powerful an assistive environment for development and to write in meta language to common web technologies.

## Introduction
It's a simple but powerful boilerplate for building frontend themes. However it is not perfect 
at the time - and won't ever be - so I will update it continuously. You are welcome to open 
an issue or creating a pull request.

## Requirements
You need to have:
* [`Node.js`](https://nodejs.org/) (and `npm`) installed to your system (I tested it with `v6.2.1`)
* [`Bower`](https://bower.io/) installed for vendor package management

Also recommended is:
* [`gulp-cli`](https://www.npmjs.com/package/gulp-cli)
  ```
  npm install -g gulp-cli
  ```
  
All scripts and tasks are fitted to OSX/Linux so you may experience weird behaviour on Windows or others.

## Getting started
The bootstrap task for your next theme is very easy:
* Pull the latest `master` from this repository and copy all files into your new project's folder **or**
* Fork this repository

Then you may follow this short todo list:
1. Remove/Clear this readme file
2. Update `package.js` and `bower.json` with your details
3. Maybe change the license
4. Remove or edit the default `index.html` file
5. Extend or remove the `humans.txt`
6. Update the coding standard in `.editorconfig`, `.eslintrc` and `.sass-lint.yml` to your needs
7. Remove the `CHANGELOG`

### Development
When you are coding just run
```
npm start
```
or use the `gulp-cli` to run custom or separated tasks
```
gulp lint
```

The `default` and `watch` gulp task will watch the files and compile them if a change was detected. 
`npm start` will just run the gulp default's task.

### Building
There's already a configuration for the GitLab CI which will run lint's and builds the project 
on pushes to refs like `vX.X.X` (e.g. version tags) and `env/*`. The building task also prepares 
a downloadable artifact.

If you want to use another CI or compile it locally you can use the gulp `build` tasks defined in `gulpfile.js`.

## Special Thanks
This boilerplate was made possible by all these cool and powerful tools that are running in 
the background and help us every day.
 
**Open Source ist awesome!**

Tools used:
* [Node.js](https://nodejs.org/)
* [Bower](https://bower.io/)
* [Gulp](http://gulpjs.com/)
* [Babel](https://babeljs.io/)
* [ESLint](http://eslint.org/)
* [sass-lint](https://github.com/sasstools/sass-lint)
* [UglifyJs2](https://github.com/mishoo/UglifyJS2)
* [UglifyCSS](https://github.com/fmarcia/UglifyCSS)
* ... and many more!
* ... and all their subpackages

**Thank you!**

## License
This software is unlicensed, so you can build your own software upon it and may add another license 
or create new boilerplates out of it, etc.

However this software uses several tools and programs which have different licenses. 