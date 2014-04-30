'use strict';

var drop = require('drop');
var minify = require('minify');

/**
 * Optimize images using imagemin
 */

drop(function (items) {
    minify(items, function (err, files) {
        if (err) {
            return console.log(err);
        }

        console.log(files);
    });
});
