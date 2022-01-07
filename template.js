/*
 * grunt-init-wp-theme
 *
 * Copyright (c) 2021 Brian Bintz
 * Licensed under the GPLv2 license. 
 */

'use strict';

// Basic template description.
exports.description = 'Create a WordPress theme.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'wp-theme'}, [
    // Prompt for these values.
    {
      name: 'name',
      message: 'Theme Name',
      default: '',
      validator: /^[0-9a-z\_\-]+$/,
      warning: 'Must be only lower case letters, numbers, dashes, and underscores.'
    }, 
    init.prompt('title'),
    init.prompt('description', 'WordPress theme'),
    init.prompt('version'),
    { 
      name: 'author_name',
      message: 'Author name',
      default: function(value, data, done) {
        // Attempt to pull the data from the user's git config.
        grunt.util.spawn({
          cmd: 'git',
          args: ['config', '--get', 'user.name'],
          fallback: ''
        }, done);
      },
      validator: /^[\w\-\.\_ ]+$/,
      warning: 'Must be only letters, numbers, dashes, dots, or underscores.'
    },
    { 
      name: 'author_email',
      message: 'Author email',
      default: function(value, data, done) {
        // Attempt to pull the data from the user's git config.
        grunt.util.spawn({
          cmd: 'git',
          args: ['config', '--get', 'user.email'],
          fallback: ''
        }, done);
      },
      validator: /^[\w\-\.\_\@]+$/,
      warning: 'Should be a valid email address.'
    },
    {
      name: 'wp_account',
      message: 'WordPress.org account',
      default: '',
      validator: /^[\w\-\.\_]+$/,
      warning: 'Must be only letters, numbers, dashes, dots, or underscores.'
    }
  ], function(err, props) {

    // A few additional properties.
    props.dependencies = {};

    props.keywords = [];

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // All done!
    done();
  });

};
