/* global node */
'use strict';

var drop = require('component/drop-anywhere');
var each = node('each-async');
var fs = node('fs');
var Imagemin = node('imagemin');
var path = node('path');
var Spinner = require('component/spinner');

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
    var ret = [];

    toggle('#drop-anywhere');
    spin();

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

        spin.remove();
        toggle('#drop-anywhere');

        ret = [];
    });
});
