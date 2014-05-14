'use strict';

var compress = require('compress');
var Drop = require('drop');
var Spin = require('spin');
var Summary = require('summary');

/**
 * Initialize app
 */

function init() {
    var drop = new Drop();
    var spin = new Spin();
    var summary = new Summary();

    drop.show(function (e) {
        var arr = [];

        e.items.forEach(function (item) {
            arr.push(item);
        });

        drop.hide();
        spin.show();

        compress(arr, function (err, items) {
            if (err) {
                throw err;
            }

            spin.hide();
            summary.show(items);

            return init();
        });
    });
}

/**
 * Run
 */

init();
