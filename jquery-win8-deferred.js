/*!
 * jquery-win8-deferred - jQuery $.when that understands WinJS.promise
 * version: 0.1
 * author: appendTo, LLC
 * copyright: 2012
 * license: MIT (http://www.opensource.org/licenses/mit-license)
 * date: Thu, 01 Nov 2012 07:38:13 GMT
 */
 (function () {
    var $when = $.when;
    $.when = function () {
        var args = Array.prototype.slice.call(arguments);

        args = $.map(args, function (arg) {
            if (arg instanceof WinJS.Promise) {
                arg = $.Deferred(function (dfd) {
                    arg.then(

                    function complete() {
                        dfd.resolveWith(this, arguments);
                    }, function error() {
                        dfd.rejectWith(this, arguments);
                    }, function progress() {
                        dfd.notifyWith(this, arguments);
                    });
                }).promise();
            }

            return arg;
        });

        return $when.apply(this, args);
    };
}());