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
  var divs = divs = document.getElementsByTagName('div');
  var divsInitial = typeof (divsInitial) == 'undefined' ? [] : divsInitial;
  const initialize = function () {

    chrome.storage.local.get('init', (result) => {
      if (result.init === false) {

        // TODO: Move initialization to a separate function
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
  console.log(divs);
  console.log(divsInitial);

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

      readChromeLocalStorage(); // TEST: See all keys in local storage
    });
  }
  activeToggle();
  console.log(active); // TODO: Does not change. Need to encapsulate in a function.

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


  const getRandomColor = function (alpha = '') {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor + alpha;
  }

  const changeDivColor = function () {
    for (let i = 0; i < divs.length; i++) {
      const randomColor = getRandomColor();
      divs[i].style.backgroundColor = randomColor + '88';
      divs[i].style.border = 'solid ' + randomColor + 'ff';
    }
  }
  if (!this.active) {
    changeDivColor();
  }

  const restoreDivColor = function () {
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.backgroundColor = divsInitial[i].style.backgroundColor ? divsInitial[i].style.backgroundColor : '';
      divs[i].style.border = divsInitial[i].style.border ? divsInitial[i].style.border : '';
    }
  }
  if (this.active) {
    console.log("Restoring divs");
    restoreDivColor();
  }


  return;
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: runPlugin
  },
    (results) => { });
});