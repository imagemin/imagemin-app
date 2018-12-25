/* global node */
'use strict';

const drop = require('component/drop-anywhere');

const each = node('each-async');
const fs = node('fs');
const imagemin = node('imagemin');
const path = node('path');
const Spinner = require('component/spinner');

const imageminGifsicle = node('imagemin-gifsicle');
const imageminJpegtran = node('imagemin-jpegtran');
const imageminOptipng = node('imagemin-optipng');
const imageminPngquant = node('imagemin-pngquant');
const imageminSvgo = node('imagemin-svgo');

/**
 * Minify images
 *
 * @param {Object} file
 * @param {Function} cb
 * @api private
 */

function minify(file, cb) {
	fs.readFile(file.path, (err, buf) => {
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
		}).then(file => {
			cb(null, Object.assign(file, {original: buf}));
		}).catch(error => {
			cb(error);
		});
	});
}

/**
 * Create spinner
 *
 * @api private
 */

function spin() {
	let w = document.body.offsetWidth;
	let h = document.body.offsetHeight;
	const s = new Spinner()
		.size(w / 4)
		.light();

	s.el.style.position = 'absolute';
	s.el.style.top = `${(h / 2) - ((w / 4) / 2)}px`;
	s.el.style.left = `${(w / 2) - ((w / 4) / 2)}px`;

	spin.remove = () => {
		document.body.removeChild(s.el);
	};

	window.addEventListener('resize', () => {
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

drop(e => {
	let files = [];

	toggle('#drop-anywhere');
	spin();

	each(e.items, (item, i, done) => {
		minify(item, (err, file) => {
			if (err) {
				done(err);
				return;
			}

			files.push(file);
			done();
		});
	}, err => {
		if (err) {
			console.error(err);
			return;
		}

		toggle('#drop-anywhere');
		spin.remove();

		files = [];
	});
});
