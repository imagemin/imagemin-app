/*global node */
'use strict';

var each = require('each-async');
var fs = node('fs');
var Imagemin = node('imagemin');
var path = node('path');

/**
 * Minify images
 *
 * @param {Array} files
 * @api public
 */

module.exports = function (items, cb) {
    cb = cb || function () {};

    each(items, function (item, i, next) {
        fs.readFile(item.path, function (err, buf) {
            if (err) {
                return next(err);
            }

            var imagemin = new Imagemin()
                .src(buf)
                .dest(path.join(path.dirname(item.path), 'optimized', path.basename(item.path)))
                .use(Imagemin.gifsicle())
                .use(Imagemin.jpegtran())
                .use(Imagemin.optipng())
                .use(Imagemin.pngquant())
                .use(Imagemin.svgo());

            imagemin.optimize(function (err) {
                if (err) {
                    return next(err);
                }
            });
        });
    }, function (err) {
        if (err) {
            return cb(err);
        }

        return cb();
    });
};
