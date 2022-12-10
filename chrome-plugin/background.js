// The local storage functions are used for initialization.
chrome.storage.local.set({ 'active': false }, () => { });
chrome.storage.local.set({ 'init': false }, () => { });

// The body of this function will be executed as a content script inside the current page
function runPlugin() {

  /**
   * True when plugin is active. False otherwise.
   */
  let active = null;

  console.log("Plugin running"); // FOR DEBUGGING

  /**
   * Returns a random color in hex format.
   * @param {String} alpha Alpha value in hex format. 00 for 0. FF for 1. 
   * @returns A string in hex format. #RRGGBB or #RRGGBBAA if alpha is provided.
   */
  const getRandomColor = function (alpha = '') {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor + alpha;
  }

  /**
   * Read all keys in chrome.storage.local and log them to the console.
   */
  let readChromeLocalStorage = function () {
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

        readChromeLocalStorage(); // TEST: See all keys in local storage
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

  const changeDivColor = function () {
    for (let i = 0; i < divs.length; i++) {
      const randomColor = getRandomColor();
      divs[i].style.backgroundColor = randomColor + '88';
      divs[i].style.border = 'solid ' + randomColor + 'ff';
    }
  }

  const restoreDivColor = function () {
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.backgroundColor = '';//divsInitial[i].style.backgroundColor ? divsInitial[i].style.backgroundColor : '';
      divs[i].style.border = '';//divsInitial[i].style.border ? divsInitial[i].style.border : '';
    }
  }

  // Set local storage asynchronously
  const activeToggle = function () {

    chrome.storage.local.get('active', (result) => {
      active = !result.active;
      console.log(active);

      if (active === true) {
        chrome.storage.local.set({ 'active': true }, () => { });
      } else {
        chrome.storage.local.set({ 'active': false }, () => { });
      }
      console.log('active async: ', active);

      if (!active) {
        changeDivColor();
      } else {
        console.log("Restoring divs");
        restoreDivColor();
      }

      readChromeLocalStorage(); // TEST: See all keys in local storage
    });
  }
  activeToggle();

  /*async function getLocalData() {
    let pro = new Promise(function (resolve, reject) {
      chrome.storage.local.get(key, (result) => {
        resolve(result);
      });
    })
 
    const r = await pro;
    console.log('Value currently is ', key, ":", r);
  }
  getLocalData();*/

  // End main

  return;
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: runPlugin
  },
    (results) => { });
});