chrome.runtime.onInstalled && chrome.runtime.onInstalled.addListener(
    function createContextItem() {
        chrome.contextMenus.create({
            contexts: ['all'],
            id: 'background_img',
            title: 'Open background image in new tab'
        });
    }
);

chrome.contextMenus.onClicked.addListener(function onContextMenu(info, tab) {
    chrome.tabs.sendMessage(tab.id, '', function onMessageResponse(response) {
        if (!response) {
            return console.error('Failed to find any background image');
        }

        chrome.tabs.create({
            index: tab.index + 1,
            url: response
        });
    });
});
