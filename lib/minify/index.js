/*global node */
'use strict';

var each = require('each-async');
var fs = node('fs');
var Imagemin = node('imagemin');

/**
 * Optimize images
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
                .use(Imagemin.gifsicle())
                .use(Imagemin.jpegtran())
                .use(Imagemin.optipng())
                .use(Imagemin.svgo());

            imagemin.optimize(function (err, data) {
                if (err) {
                    next(err);
                }

                arr.push({ path: file.path, contents: data.contents, type: file.type });
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
