'use strict';

// Holds the selected target. We need to fetch this from either contextmenu (obviously the best),
// or the mousedown event (filtered by button). The contextmenu event doesn't always provide us
// with the selected element, instead just giving us the HTML element, so we need to check that.
var target;

function getBackgroundImage(element) {
    while (element) {
        var bg = getComputedStyle(element).getPropertyValue('background-image');

        if (bg !== 'none') {
            return bg.match(/url\("?(.+?)"?\)/)[1];
        }

        element = element.parentElement;
    }
}

function setTarget(e) {
    var isActualTarget = e.target !== window.document.documentElement;
    var isMouseEvent = e.type === 'mousedown';
    var isRightClick = isMouseEvent && e.which === 3;

    if (!isActualTarget || (isMouseEvent && isRightClick)) {
        return;
    }

    target = e.target;
}

function addListeners(frame) {
    frame.addEventListener('mousedown', setTarget, false);
    frame.document.addEventListener('contextmenu', setTarget, false);
}

addListeners(window);

// Listen for "get background image" requests, perform lookup and return the result
chrome.runtime.onMessage.addListener(function onMessage(msg, sender, sendResponse) {
    sendResponse(getBackgroundImage(target));
});
