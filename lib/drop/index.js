'use strict';

var drop = require('drop');
var el = document.querySelector('#Drop');

/**
 * Create a `drop` element
 */

drop(el, function (e) {
    e.items.forEach(function (item) {
        console.log(item);
    });
});
