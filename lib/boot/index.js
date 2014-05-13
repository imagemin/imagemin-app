'use strict';

var compress = require('compress');
var drop = require('drop');

/**
 * Minify images using imagemin
 */

drop(document.querySelector('.Drop'), function (e) {
    var arr = [];

    e.items.forEach(function (item) {
        arr.push(item);
    });

    compress(arr);
});
