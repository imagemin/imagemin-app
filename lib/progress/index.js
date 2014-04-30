'use strict';

/**
 * Create a progress
 *
 * @param {Array} items
 * @param {Function} cb
 * @api public
 */

module.exports = function (items, cb) {
    var arr = [];

    items.forEach(function (item) {
        arr.push(item);
    });

    cb(arr);
};
