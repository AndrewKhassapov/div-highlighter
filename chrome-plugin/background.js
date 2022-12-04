// Global properties
var active = false;
var divs = [];
var divsInitial = [];

// The body of this function will be executed as a content script inside the current page
function runPlugin() {

  console.log("Plugin running", active); // FOR DEBUGGING

  var main = function () {

    const getRandomColor = function (alpha = '') {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return "#" + randomColor + alpha;
    }

    divs = document.getElementsByTagName('div');
    //const divsInitial = [];
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
  });
});