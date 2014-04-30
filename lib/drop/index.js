'use strict';

var drop = require('drop');
var el = document.querySelector('#Drop');

/**
 * Create a `drop`
 *
 * @param {Function} cb
 * @api public
 */

module.exports = function (cb) {
    drop(el, function (e) {
        var arr = [];

        e.items.forEach(function (item) {
            arr.push({ path: item.path, name: item.name, type: item.type });
        });

        cb(arr);
    });
};
