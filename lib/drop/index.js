'use strict';

var classes = require('classes');
var emitter = require('emitter');
var events = require('events');
var normalize = require('normalized-upload');

/**
 * Initialize a new `Drop`
 *
 * @api public
 */

function Drop() {
	if (!(this instanceof Drop)) {
		return new Drop();
	}

	this.el = document.createElement('div');
	this.events = events(window, this);
	this.classes = classes(this.el);
	this.classes.add('Drop');
	this.events.bind('drop', 'drop');
	this.events.bind('dragleave', 'hide');
	this.events.bind('dragover', 'over');
	this.events.bind('dragenter', 'show');
	this.first = false;
	this.second = false;
	this.add();
}

/**
 * Mixins
 */

emitter(Drop.prototype);

/**
 * Add element
 *
 * @api public
 */

Drop.prototype.add = function () {
	document.body.appendChild(this.el);
	return this;
};

/**
 * Remove element
 *
 * @api public
 */

Drop.prototype.remove = function () {
	document.body.removeChild(this.el);
	return this;
};

/**
 * Over handler
 *
 * @api public
 */

Drop.prototype.over = function (e) {
	e.preventDefault();
	return this;
};

/**
 * Show handler
 *
 * @api public
 */

Drop.prototype.show = function () {
	if (this.first) {
		this.second = true;
	} else {
		this.first = true;
		this.classes.add('is-over');
	}

	return this;
};

/**
 * Hide handler
 *
 * @api public
 */

Drop.prototype.hide = function () {
	if (this.second) {
		this.second = false;
	} else if (this.first) {
		this.first = false;
	}

	if (!this.first && !this.second) {
		this.classes.add('is-over');
	}

	return this;
};

/**
 * Drop handler
 *
 * @api public
 */

Drop.prototype.drop = function (e) {
	e.stopPropagation();
	e.preventDefault();
	this.classes.remove('is-over');
	normalize(e, function (f) {
		this.emit('drop', f.items);
	}.bind(this));
};

/**
 * Unbind event handlers
 *
 * @api public
 */

Drop.prototype.unbind = function () {
	this.remove();
	this.events.unbind();
	return this;
};

/**
 * Module exports
 */

module.exports = Drop;
