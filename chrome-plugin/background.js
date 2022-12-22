// The local storage functions are used for initialization.
chrome.storage.local.set({ 'active': false }, () => { });
chrome.storage.local.set({ 'init': false }, () => { });

/**
 * The body of this function will be executed as a content script inside the current page
 * @returns {boolean} The current state of the extension.
 */
function runPlugin(isActive, log = false) {

  if (log) console.log("Extension running. Is active: ", isActive); // FOR DEBUGGING

  // Initialize web elements
  var divs = typeof (divs) == 'undefined' ? document.getElementsByTagName('div') : divs;

  /*
  const initialize = function () {
    // Initialize elements
    chrome.storage.local.get('init', (result) => {
      if (result.init === false) {

        console.log('Initializing plugin');
        divsInitial = [];
        if (divsInitial.length <= 0) {
          for (let i = 0; i < divs.length; i++) {
            divsInitial[i] = divs[i];
          }
        }

        chrome.storage.local.set({ 'init': true }, () => { });

        logChromeLocalStorage(); // TEST: See all keys in local storage
      }

    });
  }
  initialize();
  var divsInitial = typeof (divsInitial) == 'undefined' ? [] : divsInitial;
  */


  /**
   * Colors all <div/> elements on the page.
   */
  const colorDivs = function () {
    for (let i = 0; i < divs.length; i++) {
      const randomColor = getRandomColor();
      divs[i].style.backgroundColor = randomColor + '88';
      divs[i].style.border = 'solid ' + randomColor + 'ff';
    }
  }

  /**
   * Clears the inline style background color and border of all <div/> elements on the page.
   */
  const clearDivs = function () {
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.backgroundColor = '';//divsInitial[i].style.backgroundColor ? divsInitial[i].style.backgroundColor : '';
      divs[i].style.border = '';//divsInitial[i].style.border ? divsInitial[i].style.border : '';
    }
  }

  // Set local storage asynchronously
  const activeToggle = function () {

    if (isActive === true) {
      clearDivs();
    } else {
      colorDivs();
    }

    if (log) logExtensionLocalStorage(); // LOG: See all keys in local storage
  }
  activeToggle();

  return isActive;
}

/**
 * Runs the extension.
 */
chrome.action.onClicked.addListener((tab) => {

  chrome.storage.local.get('active', (result) => {

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: runPlugin,
      args: [result.active, true]
    },
      (results) => { });

    // Toggling flag and icon for user interface
    if (result.active === false) {
      chrome.storage.local.set({ 'active': true }, () => { });

      try {
        chrome.action.setTitle({ title: 'Click to restore divs' }, () => { });
        chrome.action.setIcon({
          path: {
            '16': '/images/on/icon16.png',
            '32': '/images/on/icon32.png',
            '48': '/images/on/icon48.png',
            '128': '/images/on/icon128.png'
          }
        });
      } catch (e) {
        if (log) console.log('Error on set \'on\' icon:', e);
      }

    } else {
      chrome.storage.local.set({ 'active': false }, () => { });

      try {
        chrome.action.setTitle({ title: 'Click to highlight divs' }, () => { });
        chrome.action.setIcon({
          path: {
            "16": "/images/ext/icon16.png",
            "32": "/images/ext/icon32.png",
            "48": "/images/ext/icon48.png",
            "128": "/images/ext/icon128.png"
          }
        });
      } catch (e) {
        if (log) console.log('Error on set initial icon:', e);
      }

    }

  });
});