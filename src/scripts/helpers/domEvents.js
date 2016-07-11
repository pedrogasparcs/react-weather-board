/**
 * Created by PedroGaspar on 11/07/16.
 */
/*
based on:
http://stackoverflow.com/questions/16089421/simplest-way-to-detect-keypresses-in-javascript
 */
function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    } else {
        element["on" + eventName] = callback;
    }
}

function removeEvent (element, eventName, callback) {
    // missing implementation
}

module.exports = {
    addEvent: addEvent,
    removeEvent: removeEvent
}