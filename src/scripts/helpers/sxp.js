/**
 * Created by PedroGaspar on 22/03/16.
 * Simple XMLHTTPRequest Promise - sxp
 *
 * Why include jQuery just for this?
 */

/**
 *
 * @param url
 * @param data
 * @param method
 * @param isJson
 * @returns {Promise}
 */
function ajax (url, data, method, isJson) {
    var method = method.toUpperCase();
    var promise = new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(method, url, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var res = request.responseText;
                if (isJson) {
                    res = JSON.parse(res);
                }
                resolve (res);
            } else {
                reject({'status': request.status, 'msg': 'server error'});
            }
        };
        request.onerror = function() {
            reject({'status': request.status, 'msg': 'server error'});
        };
        if (method == 'POST') {
            //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            request.setRequestHeader('Content-Type', 'application/json');
        }
        //request.withCredentials = true;
        request.send(JSON.stringify(data));
    });
    return promise;
}

module.exports = {
    'ajax': ajax
};