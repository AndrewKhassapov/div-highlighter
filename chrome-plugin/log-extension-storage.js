
/**
 * Read all keys in chrome.storage.local and log them to the console.
 */
let logExtensionLocalStorage = function () {
    chrome.storage.local.get(null, (items) => {
        var allKeys = Object.keys(items);
        console.log('All keys in chrome.storage.local: ', allKeys);

        allKeys.forEach(key => {
            chrome.storage.local.get(key, (result) => {
                console.log(' Value of ', key, ":", result);
            });
        });
    });
}