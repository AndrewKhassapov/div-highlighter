// The body of this function will be executed as a content script inside the current page
function runPlugin() {

  var active = false; // TODO: Store and get from local storage.
  console.log("Plugin running", active); // FOR DEBUGGING

  // Set local storage
  const key = 'active';
  const value = false;
  chrome.storage.local.set({ key: value }, () => {
    console.log('Value is set to ' + value);
  });

  // Retrieve data from local storage
  chrome.storage.local.get([key], (result) => {
    console.log('Value currently is ' + result.key);
  });


  var main = function () {

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
    if (!active) {
      changeDivColor();
    }

    const restoreDivColor = function () {
      for (let i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = divsInitial[i].style.backgroundColor ? divsInitial[i].style.backgroundColor : '';
        divs[i].style.border = divsInitial[i].style.border ? divsInitial[i].style.border : '';
      }
    }
    if (active) {
      console.log("Restoring divs");
      restoreDivColor();
    }

    active = !active;
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