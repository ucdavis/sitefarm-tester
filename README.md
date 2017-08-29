# Sass based SiteFarm One subtheme starterkit

This starterkit is meant as a one-off starting point to customize the SiteFarm 
One parent theme. This is perfect for doing simple things like adding or 
tweaking some CSS or Javascript. In addition it provides some guidelines for 
overriding [Twig](http://twig.sensiolabs.org/) templates which contain the HTML for the site.

This difference between this and the Basic starterkit is that this one uses Sass 
to compile CSS. In addition, it uses Gulp to compile the Sass and also 
ES2015 (es6) Javascript.

General Drupal theming documentation can be found here: [https://www.drupal.org/docs/8/theming](https://www.drupal.org/docs/8/theming)

# Setup

### Prerequesites

If you are a Windows user then it is recommended you use [Git for Windows](http://git-for-windows.github.io/).

You'll need [node.js](http://nodejs.org).

After installing Node you should install Gulp and Bower globally (you may need to use `sudo` on a Mac if you get errors).

```
$ npm install --global gulp bower
```

## Install and setup

After cloning and changing into that directory, run this to install dependencies (you may need to use `sudo` on a Mac if you get errors):

    $ npm install
    $ bower install

You may have to run that again for updates; so it may be wise to save this: `$ npm install && bower install`. **If you have any problems; this is the first thing to run.**

Finally, to do an initial build of the site and start watching for changes run `gulp`

```
$ gulp
```

### Bower

Bower is a package manager for the web. It is useful for adding third party libraries for both development and site inclusion.

Install any [Bower](http://bower.io) component with the `--save` or `--save-dev` flag. You can search for [anything that Bower can install](http://bower.io/search/) and run:

    $ bower install {thing} --save

Use `--save` when a package needs to be added as a dependency to the browser such as using [jQuery](https://jquery.com/). The js and css in these packages will automatically be compiled to the `scripts.js` and `vendor.css` files.

Use `--save-dev` when a package is specifically for development purposes like when using a Sass library such as [Breakpoint](http://breakpoint-sass.com/)

#### Bower Overrides

If a Bower package does not specify all the assets you need in its `"main"` property, then you can add or delete other assets it has packaged with an override. You can also remove any dependencies that it might want to include.

Add overrides to the `bower.json` file.

```json
{
  "overrides": {
    "package-name": {
      "main": ["file-you-want-included.js"],
      "dependencies": {}
    }
  }
}
```

#### Bower Include Paths

If Bower is used to add dependencies and libraries for Sass then it is helpful to add it's `includePaths` to the `gulp-config.yml` file. This allows shorter import names to work in Sass files.

With an `includePaths` added to the `gulp-config.yml` file a simple `@import "breakpoint";` can be used instead of `@import "../bower_components/breakpoint-sass/stylesheets/breakpoint";"`.

This also helps with any dependencies that Bower package might rely on.

## Gulp

Gulp is a task/build runner for development. It allows you to do a lot of stuff within your development workflow. You can compile sass files, uglify and compress js files and much more.

- [Gulp Website](http://gulpjs.com/)
- Article from CSS Tricks: [Gulp for Beginners](https://css-tricks.com/gulp-for-beginners/)

### Local Gulp Configuration

Gulp configuration can be customized to a local environment by creating a `gulp-config--custom.yml` file. Any custom config specific to a local setup can be placed in here and it will not be committed to Git.

Default configuration is found in `gulp-config.yml`. You can copy out config you want to change into your custom file.

### Gulp Tasks

There are 4 main gulp tasks you should be aware of. Just add `gulp` before each task like `$ gulp help`.

1. **Help** - Displays a list of all the available tasks with a brief discription of each
2. **Default** - Generate the entire site and start watching for changes to live reload in the browser
3. **Compile** - Generate the entire site with all assets such as css and js
4. **Validate** - Validate CSS and JS by linting

`$ gulp` is the one most often used and is the same as `$ gulp default`

### Using Gulp with PHPStorm

PHPStorm has [Gulp Tool Window](https://www.jetbrains.com/phpstorm/help/gulp-tool-window.html) for easy use of Gulp tasks.
Right-click on the `gulpfile.js` file and choose `Show Gulp Tasks` to open the window.

Double click `default` to start gulp and begin watching files for changes.

You can double click `help` to see descriptions of available tasks

### BrowserSync

BrowserSync is being used by Gulp to allow live reloading so that changes will be injected automatically into the site without having to reload.

When doing local development with a local server like [MAMP](https://www.mamp.info/en/) or [WAMP](http://www.wampserver.com/en/) you will want to add a `domain` option to a `gulp-config--custom.yml` file.

```yaml
browserSync:
  domain: mydomain.local
```

Drupal does not play too nice with BrowserSync due to its use of `@import` tags
instead of `<link>` tags. To get it to work, go into your `settings.local.php`
file in Drupal and add the following:

    $settings['css_link_tags'] = TRUE;

- [BrowserSync Website](https://www.browsersync.io/)
- [Example Video](https://youtu.be/907K7nqYesg)

# Folder Structure

```
|-- bower_components/
|-- config/
|-- dist/
|-- gulp_tasks/
|-- images/
|-- js/
|-- node_modules/
|-- sass/
|-- templates/
|-- .babelrc
|-- .eslintrc.yml
|-- .gitignore
|-- .sass-lint.yml
|-- gulp-config.yml
|-- gulpfile.js
|-- logo.svg
|-- npm-shrinkwrap.json
|-- package.json
|-- THEMENAME.info
|-- THEMENAME.libraries.yml
|-- THEMENAME.theme
```

## 1. bower_components/
This directory does not exist by default, but it will be created automatically 
once `bower install` is run. This directory should never be edited, and it should 
not be committed to git.

## 2. config/
This folder contains configuration that is installed only on the initial install.

**install/THEMENAME.settings.yml**: This file contains all 
default settings and should initially be a clone of what is in the 
sitefarm_one.settings.yml file.

[https://www.drupal.org/docs/8/theming-drupal-8/creating-advanced-theme-settings](https://www.drupal.org/docs/8/theming-drupal-8/creating-advanced-theme-settings)

**schema/THEMENAME.schema.yml**: This file is used by Drupal to 
provide translations for items like the THEMENAME.settings.yml file.

[https://www.drupal.org/docs/8/api/configuration-api/configuration-schemametadata](https://www.drupal.org/docs/8/api/configuration-api/configuration-schemametadata)

## 3. dist/
Sass and Javascript (es6) are compiled into minified and concatenated CSS and 
Javascript files. Files in this directory are auto-generated so should never be
manually edited. This is what Drupal looks to for production ready assets.

## 4. gulp_tasks/
This directory contains all of the gulp tasks that will compile your sass and 
js. Files in this directory shouldn't need to be edited. Most changes can be 
handled through the root gulp-config.yml file.

## 5. images/
Image files like jpeg, gif, png, or svg should be added to this directory.


## 6. js/
Javascript files belong in this directory. A default scripts.js file is already
available for use. All files will be compiled to `/dist/scripts.js`.

**scripts.js**: This file contains an [IIEF](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) closure passing in jQuery so that the `$` 
can be used instead of having to type out `jQuery`. Drupal uses jQuery in 
noConflict mode so the `$` is normally not mapped to jQuery. Also a Drupal 
Behavior called `customBehavior` has been added as an example. Behaviors are 
helpful for allowing your javascript to work nicely with Drupal and Drupal's 
Ajax system.

This file varies from the "Basic" branch in that is allows es6 (ES2015) due to 
transpiling by Babel so that older browsers can still use it.

A `vendor` subdirectory may be added to this folder where third party js can be 
added in. Bower is preferable to doing this, but sometimes it is needed. This 
code will be minified, concatenated, and loaded after Bower javascript.

More information on using Javascript in Drupal can be found here: [https://www.drupal.org/docs/8/api/javascript-api/javascript-api-overview](https://www.drupal.org/docs/8/api/javascript-api/javascript-api-overview)

## 7. node_modules/
This directory does not exist by default, but it will be created automatically 
once `npm install` is run. This directory should never be edited, and it should 
not be committed to git.

## 8. sass/
All (S)CSS files should go in this directory.

**style.scss**: This is the master file for all scss. All partials in 
`/sass/component/` will automatically be included. Styles should ideally go into
individual component files rather than directly into this file. This will 
compile to `/dist/style.css`.

If you want to use variables and mixins from SiteFarm One, you will need to
uncomment the `@import` lines and ensure that the path to the SiteFarm One theme
is correct.

**ckeditor.scss**: When using the CKEditor WYSIWYG, it is helpful to see the styles 
which will be applied in the actual theme. This file allows styles to be 
injected into the editor so that a user gets a better idea of how text and 
components like buttons, lists, and links will really look. Sitefarm One already
provides many defaults, so most likely this file will not have much in it. This 
will compile to `/dist/ckeditor.css`.

A `vendor` subdirectory may be added to this folder where third party css can be 
added in which has already been minified. Ideally for items like that you would 
use Bower, but there are some cases where it is needed. Any CSS files in this 
directory will be concatenated after Bower CSS into a single file 
`/dist/vendor.css`.

**WARNING** If any Bower or /sass/vendor css files are added, be sure to 
uncomment the `vendor.css` file in the global-styles library in 
`THEMENAME.libraries.yml`.

```yaml
global-styles:
  version: VERSION
  css:
#    base:
#      dist/vendor.css: {}
```

## 9. templates/
The `templates` directory allows [Twig](http://twig.sensiolabs.org/) files to be
added so that HTML markup can be overridden or customized. These files end with
`.html.twig`. For example: `block.html.twig` or `node--teaser.html.twig`.

Drupal auto-detects twig files based on [naming conventions](https://www.drupal.org/docs/8/theming/twig/twig-template-naming-conventions).
So if you name a Twig file correctly, Drupal will automatically use it.

In addition you can suggest templates for use when certain conditions are met.

This link provides documentation for working with Drupal 8 templates: 
[https://www.drupal.org/docs/8/theming/twig/working-with-twig-templates](https://www.drupal.org/docs/8/theming/twig/working-with-twig-templates)

## Files
**.babelrc**: Configuration for Babel so that it knows to use ES2015 when 
compiling Javascript. There should not be a need to edit this file.

**.eslintrc.yml**: This file sets the rules for doing Javascript 
linting/validation. A predefined coding style is set, but you may edit it to a 
syntax that is preferable.

[ESLint rule documentation](http://eslint.org/docs/rules/)

**.gitignore**: This tells Git what files and directories should not be 
committed to a Git repository. You may add in extra items to ignore.

**.sass-lint.yml**: Configuration rules for how Sass should be linted/validated. 
It already contains sensible defaults for coding guidelines, but you may edit as 
needed.

[Sass Lint rule documentation](https://github.com/sasstools/sass-lint/tree/master/docs/rules)

**bower.json**: This is the main configuration for all Bower packages.

**gulp-config.yml**: Configuration for how Gulp should compile source files 
such as Sass and Javascript. If you only need to make edits for local 
development then you can create a `gulp-config--custom.yml` file which will be 
ignored by Git. Then overwrite any configuration needed.

**gulpfile.js**: Master file used by Gulp for defining tasks. There is likely 
no reason to edit this file.

**logo.svg**: This image file should be replaced with your site's own logo file.
It should be named `logo.EXTENSION`. It's preferable to use a `.svg` file. 
Although regular `.jpeg` and `.png` files are acceptable.

**npm-shrinkwrap.json**: This is a Lock file so that everyone on your team will 
be sure to install the exact same Node packages. If you need to edit the 
`package.json` file, you should run `$ npm shrinkwrap --dev` after so that it 
will update this lock file.

**package.json**: This is the main file used by Node to declare any NPM packages
that will be used for things like Gulp. Likely you will not need to edit this 
file unless there are specific Node packages you need.

**THEMENAME.info**: This is the main file which declares a theme to Drupal. It 
contains information about the theme, declares the parent theme, adds libraries,
and declares regions where content can be placed. It also allows for [overriding 
libraries](https://www.drupal.org/docs/8/theming-drupal-8/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-theme#override-extend)
in the parent SiteFarm One theme.

[https://www.drupal.org/docs/8/theming-drupal-8/defining-a-theme-with-an-infoyml-file](https://www.drupal.org/docs/8/theming-drupal-8/defining-a-theme-with-an-infoyml-file)

**THEMENAME.libraries**: Libraries for CSS and Javascript can be defined here. By 
default this file declares 2 CSS files and 1 Javascript file. These will be 
loaded into the site. More libraries or dependencies can be declared if needed.

[https://www.drupal.org/docs/8/theming-drupal-8/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-theme](https://www.drupal.org/docs/8/theming-drupal-8/adding-stylesheets-css-and-javascript-js-to-a-drupal-8-theme)

**THEMENAME.theme**: This file is for more advanced users. It allows a developer to 
alter Drupal's output before it gets to a Twig template. It uses PHP and Drupal 
Hooks to change variables and data that is eventually passed to a template. This
is also where any theme suggestions would be located.

[https://www.drupal.org/docs/8/theming-drupal-8/modifying-attributes-in-a-theme-file](https://www.drupal.org/docs/8/theming-drupal-8/modifying-attributes-in-a-theme-file)