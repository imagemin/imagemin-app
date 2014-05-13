'use strict';

var drop = require('drop');

/**
 * Initialize a drop point
 *
 * @param {Element} el
 * @param {Function} cb
 * @api public
 */

module.exports = function (el, cb) {
    return drop(el, cb);
};
