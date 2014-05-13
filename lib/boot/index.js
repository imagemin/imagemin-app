'use strict';

var compress = require('compress');
var Drop = require('drop');
var Spin = require('spin');

/**
 * Initialize app
 */

function init() {
    var drop = new Drop();
    var spin = new Spin();

    drop.show(function (e) {
        var arr = [];

        e.items.forEach(function (item) {
            arr.push(item);
        });

        drop.hide();
        spin.show();

        compress(arr, function () {
            spin.hide();
            return init();
        });
    });
}

/**
 * Run
 */

init();
