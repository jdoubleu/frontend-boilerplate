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
* [`gulp-cli`](https://www.npmjs.com/package/gulp-cli) (`npm install -g gulp-cli`)

***NOTE:*** Gulp and Bower are also installed as `devDependencies`. You should yet only using 
the local version of gulp because it's a alpha version installed via "git clone".
  
All scripts and tasks are fitted to OSX/Linux so you may experience weird behaviour on Windows or others.

## Getting started
The bootstrap task for your next theme is very easy:
* Pull the latest `master` from this repository and copy all files into your new project's folder **or**
* Fork this repository

Next step is to install all (development) dependencies: `npm install && bower install`.

You may also follow this short todo list to change the package meta information:
1. Update `package.js` and `bower.json` with your details
2. Maybe change the license
3. Remove or edit the default `index.html` file
4. Extend or remove the `humans.txt`
5. Update the coding standard in `.editorconfig`, `.eslintrc` and `.stylelintrc` to your needs
6. Remove the `CHANGELOG`
7. Remove/Clear this readme file

### Extending
When you want to use additional frameworks you may add them with npm or bower. 
While any package installed with bower is meant to be used in frontend npm packages are 
meant for developing in first line.
 
For example if you want to include a jQuery plugin install it with bower
```
bower install --save <package>
```
and include it in your html's heads
```
<script src="dist/vendor/<package>/somelib.js"></script>
```

When you want to use a frontend framework (e.g. [Bootstrap](getbootstrap.com)) it's nice if 
it provides sass files. You can require it with bower, to include some scripts if it has, and 
pass the sass files to the sass compiler in the gulp task in `gulpfile.js`.
```JavaScript
	...
	.pipe(sass({
		includePaths: ['path/to/sass/files']
	})
	...
```

### Workflow
When you are developing your project, run the following commands:
```
npm start
```
or use the `gulp-cli` to run custom or separated tasks
```
gulp lint
```

The `default` and `watch` gulp task will watch the files and compile them if a change was detected. 
`npm start` will just run the gulp default's task.

#### Folder structure
The structure you introduce in the `source directory` (`src/`) will be preserved in the `distribution directory` (`dist/`).
So you can use a splitted directory tree, where each asset type is in its own directory (e.g. scripts in `scripts`, styles in `styles`, etc.):
```
src/
|-- scripts
|   `-- app.js
|-- styles
|   `-- app.scss
`-- templates
    `-- main.pug
```
Or you can use a module inspired directory tree where each asset type is in the folder of its belonging module:
```
src/
|-- app
|   |-- app.js
|   |-- app.scss
|   `-- template.pug
`-- module1
    |-- helper.js
    `-- main.js
```
Of course you can mix them or use your own. 
Through the ["globstar"](https://github.com/isaacs/node-glob#glob-primer) you are free to use every structure. 

#### Linting
You can lookup all SCSS linting rules here: [https://stylelint.io/user-guide/rules/](https://stylelint.io/user-guide/rules/).
There are more detailed information about what is wrong.

### Workflow
There's already a configuration for the GitLab CI. On every push it triggers a linting.
On pushes to master it will build an artifact. The general workflow would be developing in a `develop` branch, 
while merging into a `master` branch means a release.

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
* [SASS](http://sass-lang.com/)
* [Pug](https://pugjs.org/)
* [stylelint](https://stylelint.io/)
* [UglifyJs2](https://github.com/mishoo/UglifyJS2)
* [clean-css](https://github.com/jakubpawlowicz/clean-css)
* ... and many more!
* ... and all their subpackages

**Thank you!**

## License
This software is under [MIT License](LICENSE). You are free to copy, modify, distribute this boilerplate.
You can build your own boilerplate upon it or bootstrap a theme out of it.

However this software uses several tools and programs which have different licenses. 