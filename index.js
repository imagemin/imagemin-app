/* global node */
'use strict';

var drop = require('component/drop-anywhere');
var each = node('each-async');
var fs = node('fs');
var Imagemin = node('imagemin');
var path = node('path');

/**
 * Read file
 *
 * @param {String} path
 * @param {Function} cb
 * @api private
 */

function read(path, cb) {
	fs.readFile(path, function (err, buf) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, buf);
	});
}

/**
 * Minify images
 *
 * @param {Object} file
 * @param {Function} cb
 * @api private
 */

function minify(file, cb) {
	read(file.path, function (err, buf) {
		if (err) {
			cb(err);
			return;
		}

		var imagemin = new Imagemin()
			.src(buf)
			.dest(path.join(path.dirname(file.path), 'build', path.basename(file.path)))
			.use(Imagemin.gifsicle())
			.use(Imagemin.jpegtran())
			.use(Imagemin.optipng())
			.use(Imagemin.pngquant())
			.use(Imagemin.svgo());

		imagemin.optimize(function (err, file) {
			if (err) {
				cb(err);
				return;
			}

			cb(null, file);
		});
	});
}

/**
 * Run
 */

drop(function (e) {
	var ret = [];

	each(e.items, function (item, i, done) {
		minify(item, function (err, file) {
			if (err) {
				done(err);
				return;
			}

			ret.push(file);
			done();
		});
	}, function (err) {
		if (err) {
			console.error(err);
			return;
		}

		ret = [];
	});
});
