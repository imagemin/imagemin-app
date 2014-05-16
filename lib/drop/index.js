'use strict';

var drop = require('drop');

/**
 * Initialize a new `Drop`
 *
 * @api public
 */

function Drop() {
    if (!(this instanceof Drop)) {
        return new Drop();
    }

    this.el = '<div class="Drop"></div>';
}

/**
 * Show
 *
 * @api public
 */

Drop.prototype.show = function (cb) {
    if (!document.querySelector('.Drop')) {
        document.body.innerHTML += this.el;
    }

    drop(document.body, cb);
};

/**
 * Hide
 *
 * @api public
 */

Drop.prototype.hide = function () {
    var el = document.querySelector('.Drop');
    document.body.removeChild(el);
};

/**
 * Module exports
 */

module.exports = Drop;
