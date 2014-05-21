'use strict';

var classes = require('classes');
var prettyBytes = require('pretty-bytes');

/**
 * Initialize a new `Summary`
 *
 * @api public
 */

function Summary() {
    if (!(this instanceof Summary)) {
        return new Summary();
    }

    this.el = document.createElement('div');
    this.classes = classes(this.el);
    this.classes.add('Summary');
    this.diff = 0;
}

/**
 * Add element
 *
 * @api public
 */

Summary.prototype.add = function () {
    document.body.appendChild(this.el);
    return this;
};

/**
 * Show summary
 *
 * @param {Array} files
 * @api public
 */

Summary.prototype.show = function (files) {
    this.files = files.length;

    files.forEach(function (file) {
        this.diff += file.orig - file.dest;
    }.bind(this));

    this.el.innerHTML = '<p>Optimized ' + this.files + ' ' + (this.files === 1 ? 'file' : 'files') + '</p>';
    this.el.innerHTML += '<p>(saved ' + prettyBytes(this.diff) + ')</p>';

    this.classes.add('is-visible');
    return this;
};

/**
 * Hide summary
 *
 * @api public
 */

Summary.prototype.hide = function () {
    this.files = 0;
    this.diff = 0;
    this.classes.remove('is-visible');
    return this;
};

/**
 * Module exports
 */

module.exports = Summary;
