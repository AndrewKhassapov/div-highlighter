// The local storage functions are used for initialization.
chrome.storage.local.set({ 'active': false }, () => { });
chrome.storage.local.set({ 'init': false }, () => { });

/**
 * The body of this function will be executed as a content script inside the current page
 * @returns
 */
function runPlugin(log = true) {

  /**
   * True when plugin is active. False otherwise.
   */
  let active = null;

  if (log) console.log("Plugin running"); // FOR DEBUGGING

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


  // Start main
  /*let checkStorage = function () {
const key = 'active';
const value = active;
// Retrieve data from local storage aynchronously
chrome.storage.local.get(key, (outcome) => {
 if (outcome.active === 'undefined') {
   active = false; // Initialize
   chrome.storage.local.set({ 'active': active });
 };
 active = outcome.active;
 console.log('Retrieved name: ', key, ':', outcome.active, ' set as: ', active);
});
}
checkStorage();*/

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

    chrome.storage.local.get('active', (result) => {
      active = !result.active;

      if (active === true) {
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
          }); // Error handling response: TypeError: Cannot read properties of undefined (reading 'setIcon')
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
          }); // Error handling response: TypeError: Cannot read properties of undefined (reading 'setIcon')
        } catch (e) {
          if (log) console.log('Error on set initial icon:', e);
        }

      }

      if (active === false) {
        clearDivs();
      } else {
        colorDivs();
      }

      if (log) logExtensionLocalStorage(); // LOG: See all keys in local storage
    });
  }
  activeToggle();

  return;
}

/**
 * Runs the plugin.
 */
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: runPlugin
  },
    (results) => { });
});