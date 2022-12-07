// The body of this function will be executed as a content script inside the current page
function runPlugin() {

  /**
   * True when plugin is active. False otherwise.
   */
  let active = false;

  console.log("Plugin running"); // FOR DEBUGGING


  let checkStorage = function () {

    const key = 'active';
    const value = active;

    // Set local storage asynchronously
    chrome.storage.local.set({ 'active': active }, () => {
      //console.log('Value is set to ', key, ':', value);

      chrome.storage.local.get(key, (outcome) => {
        console.log('Retrieved name: ', key, ':', outcome.active);
      });


      chrome.storage.local.get(null, (items) => {
        var allKeys = Object.keys(items);
        console.log('All keys: ', allKeys);
      });

    });
    chrome.storage.local.get(null, (items) => {
      var allKeys = Object.keys(items);
      console.log('All keys: ', allKeys);
    });


    // Retrieve data from local storage aynchronously
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

  }
  checkStorage();


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