'use strict';

var domify = require('domify');
var events = require('event');
var Overlay = require('overlay');
var prettyBytes = require('pretty-bytes');
var tmpl = require('./index.html');

/**
 * Show a summary of optimizations done
 *
 * @api public
 */

function Summary() {
    if (!(this instanceof Summary)) {
        return new Summary();
    }

    this.overlay = new Overlay({ closable: true });
    this.tmpl = domify(tmpl);
    this.close = this.tmpl.querySelector('.overlay-close');

    events.bind(this.close, 'click', this.hide.bind(this));
}

/**
 * Show
 *
 * @api public
 */

Summary.prototype.show = function (items) {
    var diff = 0;

    this.overlay.show();
    this.overlay.el.appendChild(this.tmpl);

    items.forEach(function (item) {
        diff += item.sizeOrig - item.sizeDest;
    });

    document.querySelector('.Summary-qty').innerHTML += items.length;
    document.querySelector('.Summary-saved').innerHTML += prettyBytes(diff);
};

/**
 * Show
 *
 * @api public
 */

Summary.prototype.hide = function () {
    this.overlay.hide();
};

/**
 * Module exports
 */

module.exports = Summary;
