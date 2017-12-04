/* global node */
'use strict';

var drop = require('component/drop-anywhere');
var each = node('each-async');
var fs = node('fs');
var imagemin = node('imagemin');
var path = node('path');
var Spinner = require('component/spinner');

var imageminGifsicle = node('imagemin-gifsicle');
var imageminJpegtran = node('imagemin-jpegtran');
var imageminOptipng = node('imagemin-optipng');
var imageminPngquant = node('imagemin-pngquant');
var imageminSvgo = node('imagemin-svgo');

/**
 * Minify images
 *
 * @param {Object} file
 * @param {Function} cb
 * @api private
 */

function minify(file, cb) {
	fs.readFile(file.path, function (err, buf) {
		if (err) {
			cb(err);
			return;
		}
		imagemin([file.path], path.join(path.dirname(file.path), 'build'), {
			plugins: [
				imageminGifsicle(),
				imageminJpegtran(),
				imageminOptipng(),
				imageminPngquant(),
				imageminSvgo()
			]
		}).then(function(file){
			cb(null, Object.assign(file, { original: buf }));
		}).catch(function(err){
			cb(err);
			return;
		});
	});
}

/**
 * Create spinner
 *
 * @api private
 */

function spin() {
	var w = document.body.offsetWidth;
	var h = document.body.offsetHeight;
	var s = new Spinner()
		.size(w / 4)
		.light();

	s.el.style.position = 'absolute';
	s.el.style.top = h / 2 - (w / 4) / 2 + 'px';
	s.el.style.left = w / 2 - (w / 4) / 2 + 'px';

	spin.remove = function () {
		document.body.removeChild(s.el);
	};

	window.addEventListener('resize', function () {
		w = document.body.offsetWidth;
		h = document.body.offsetHeight;
	});

	document.body.appendChild(s.el);
	return s;
}

/**
 * Toggle display
 *
 * @param {Element} el
 * @api private
 */

function toggle(el) {
	el = document.querySelector(el);

	if (el.style.display === 'none') {
		el.style.display = 'block';
		return;
	}

	el.style.display = 'none';
}

/**
 * Run
 */

drop(function (e) {
	var files = [];

	toggle('#drop-anywhere');
	spin();

	each(e.items, function (item, i, done) {
		minify(item, function (err, file) {
			if (err) {
				done(err);
				return;
			}

			files.push(file);
			done();
		});
	}, function (err) {
		if (err) {
			console.error(err);
			return;
		}

		toggle('#drop-anywhere');
		spin.remove();

		files = [];
	});
});
