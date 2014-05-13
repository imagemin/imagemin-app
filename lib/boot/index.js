'use strict';

var compress = require('compress');
var css = require('css');
var drop = require('drop');
var spin = require('spin');

/**
 * Initialize app
 */

function init() {
    var dropEl = document.querySelector('.Drop');
    var spinEl = document.querySelector('.Spin');

    css(dropEl, 'display', 'block');

    drop(dropEl, function (e) {
        var arr = [];

        e.items.forEach(function (item) {
            arr.push(item);
        });

        css(dropEl, 'display', 'none');
        css(spinEl, 'display', 'block');
        spin(spinEl);

        compress(arr, function () {
            css(spinEl, 'display', 'none');
            return init();
        });
    });
}

init();
