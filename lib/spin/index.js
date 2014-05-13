'use strict';

var spin = require('spin');

/**
 * Initialize a new `Spin`
 *
 * @api public
 */

function Spin() {
    if (!(this instanceof Spin)) {
        return new Spin();
    }

    this.el = document.querySelector('.Spin');
}

/**
 * Show
 *
 * @api public
 */

Spin.prototype.show = function () {
    document.body.appendChild(this.el);
    this.spin = spin(this.el);
    return this;
};

/**
 * Hide
 *
 * @api public
 */

Spin.prototype.hide = function () {
    this.spin.remove();
    return this;
};

/**
 * Module exports
 */

module.exports = Spin;
