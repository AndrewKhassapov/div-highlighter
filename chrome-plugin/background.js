// The body of this function will be executed as a content script inside the current page
function runPlugin() {

  /**
   * True when plugin is active. False otherwise.
   */
  let active = null;

  console.log("Plugin running"); // FOR DEBUGGING

  // TODO: Move initialization to a separate function
  let readChromeLocalStorage = function () {
    chrome.storage.local.get(null, (items) => {
      var allKeys = Object.keys(items);
      console.log('All keys in chrome.storage.local: ', allKeys);
    });
  }

  let checkStorage = function () {
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
  checkStorage();


  // Set local storage asynchronously
  const activeToggle = function () {
    active = !active;
    chrome.storage.local.set({ 'active': active }, () => {
      //console.log('Value is set to ', key, ':', value);

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


  var main = function (active = false) {

    const getRandomColor = function (alpha = '') {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return "#" + randomColor + alpha;
    }

    const divs = document.getElementsByTagName('div');
    const divsInitial = [];
    if (divsInitial.length <= 0) {
      for (let i = 0; i < divs.length; i++) {
        divsInitial[i] = divs[i];
      }
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

    this.active = !active;
  }
  main();

  return;
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: runPlugin
  },
    (results) => { });
});