/* global node */
'use strict';

var each = require('each-async');
var fs = node('fs');
var Imagemin = node('imagemin');
var path = node('path');

/**
 * Minify images
 *
 * @param {Array} files
 * @param {Function} cb
 * @api public
 */

module.exports = function (files, cb) {
	var arr = [];

	each(files, function (file, i, next) {
		fs.readFile(file.path, function (err, buf) {
			if (err) {
				return next(err);
			}

			var imagemin = new Imagemin()
				.src(buf)
				.dest(path.join(path.dirname(file.path), 'optimized', path.basename(file.path)))
				.use(Imagemin.gifsicle())
				.use(Imagemin.jpegtran())
				.use(Imagemin.optipng())
				.use(Imagemin.pngquant())
				.use(Imagemin.svgo());

			imagemin.optimize(function (err, data) {
				if (err) {
					return next(err);
				}

				arr.push({ path: file.path, orig: buf.length, dest: data.contents.length });
				next();
			});
		});
	}, function (err) {
		if (err) {
			return cb(err);
		}

		cb(null, arr);
	});
};
