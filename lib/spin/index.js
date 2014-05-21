'use strict';

var classes = require('classes');
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

    this.el = document.createElement('div');
    this.classes = classes(this.el);
    this.classes.add('Spin');
    this.add();
}

/**
 * Add element
 *
 * @api public
 */

Spin.prototype.add = function () {
    document.body.appendChild(this.el);
    return this;
};

/**
 * Remove the element
 *
 * @api public
 */

Spin.prototype.remove = function() {
    document.body.removeChild(this.el);
    return this;
};

/**
 * Show spinner
 *
 * @api public
 */

Spin.prototype.show = function () {
    this.classes.add('is-visible');
    this.spin = spin(this.el);
    return this;
};

/**
 * Hide spinner
 *
 * @api public
 */

Spin.prototype.hide = function () {
    this.classes.remove('is-visible');
    return this;
};

/**
 * Module exports
 */

module.exports = Spin;
