'use strict';

var drop = require('drop');
var minify = require('minify');
var progress = require('progress');

/**
 * Optimize images using imagemin
 */

drop(function (items) {
    minify(items, function (err, files) {
        if (err) {
            return console.log(err);
        }

        progress(files, function (html) {
            console.log(html);
        });
    });
});
