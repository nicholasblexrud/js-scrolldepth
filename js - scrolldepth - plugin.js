/*jslint browser:true*/
(function (window) {
    'use strict';

    // our constructor
    window.ScrollDepth = function () {

        // fire-off baseline event
        console.log('baseline');

        var cache = [];

        /*
         * inArray function borrowed from:
         * jQuery 1.10.1
         * http://jquery.com/
         */
        function inArray(elem, array) {
            var i, length;
            for (i = 0, length = array.length; i < length; i++) {
                if (array[i] === elem) {
                    return i;
                }
            }
            return -1;
        }

        /*
         * Each function borrowed from:
         * jQuery 1.10.1
         * http://jquery.com/
         */
        function each(object, callback) {
            var name;

            for (name in object) {
                if (object.hasOwnProperty(name) && callback.call(object[name], name, object[name]) === false) {
                    break;
                }
            }
        }

        /*
         * Throttle function borrowed from:
         * Underscore.js 1.5.2
         * http://underscorejs.org
         * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
         * Underscore may be freely distributed under the MIT license.
         */
        function throttle(func, wait) {
            var context, args, result;
            var timeout = null;
            var previous = 0;
            var later = function () {
                previous = new Date;
                timeout = null;
                result = func.apply(context, args);
            };
            return function () {
                var now = new Date;
                if (!previous) {
                    previous = now;
                }
                var remaining = wait - (now - previous);
                context = this;
                args = arguments;
                if (remaining <= 0) {
                    clearTimeout(timeout);
                    timeout = null;
                    previous = now;
                    result = func.apply(context, args);
                } else if (!timeout) {
                    timeout = setTimeout(later, remaining);
                }
                return result;
            };
        }

        /**
         * calculatePercentages() returns a object
         * based on the docHeight
         *
         * @param {Number} docHeight
         * @return {Object} object
         */
        function calculatePercentages(docHeight) {
            return {
                '25%': parseInt(docHeight * 0.25, 10),
                '50%': parseInt(docHeight * 0.50, 10),
                '75%': parseInt(docHeight * 0.75, 10),
                // 1px cushion to trigger 100% event in iOS
                '100%': docHeight - 5
            };
        }

        /**
         * checkPercentages() 
         * ?based on the passed in tag name
         *
         * @param {String} percentages
         * @param {Number} scrollDistance
         * @return ?
         */
        function checkPercentages(percentages, scrollDistance) {
            each(percentages, function (key, val) {
                if (inArray(key, cache) === -1 && scrollDistance >= val) {
                    console.log('percentage = ' + key + '.');
                    cache.push(key);
                }
            });
        }

        window.onscroll = throttle(function () {

          /*
           * We calculate document and window height on each scroll event to
           * account for dynamic DOM changes.
           */

            var body = document.body,
                html = document.documentElement,
                docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
                winHeight = window.innerHeight || html.clientHeight,
                scrollTop = body.scrollTop || html.scrollTop,

                // recalculate percentages on every scroll
                percentages = calculatePercentages(docHeight),

                // see how far we've scrolled
                scrollDistance = scrollTop + winHeight;

            // if we've fired off all percentages, then return
            if (cache.length >= 4) {
                return;
            }

            // check for percentage scrolled and see if it matches any of our percentages
            checkPercentages(percentages, scrollDistance);

        }, 500);
    };
}(window));