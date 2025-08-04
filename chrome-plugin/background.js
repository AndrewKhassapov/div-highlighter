// The local storage functions are used for initialization.
chrome.storage.local.set({ 'active': false }, () => { });
chrome.storage.local.set({ 'init': false }, () => { });

/**
 * The body of this function will be executed as a content script inside the current page
 * @param {boolean} [isActive=false] If false, highlights will be added. If true, highlights will be removed.
 * @param {boolean} [log=false] Logging for debugging. True to log. False for production.
 * @returns {boolean} The current state of the extension.
 */
function runPlugin(isActive = false, log = false) {
  // Initialize web elements
  const PROPERTY_CHECK = 'div_highlighter_active';
  const ELEMENT_CHECK = document.body;
  divs = typeof (divs) == 'undefined' ? document.querySelectorAll('div,header,nav,main,section,article,aside,footer') : divs;
  if (log) console.log('Extension running. Is active: %s. %s', isActive, divs); // FOR DEBUGGING
  /**
   * Initialize an array of web elements by tag.
   * @param {[] | HTMLCollection} varName Variable to initialize, if undefined.
   * @param {Array[string]} tagName Element tag to search for. Excluding brackets. e.g. 'div'.
   * @returns Array of elements if not initialized. Original variable if already declared.
   */
  function initializeElementsByTagName(varName, tagName = "") {
    varName = (typeof (varName) == 'undefined' ? document.getElementsByTagName(tagName) : varName);
    return varName;
  }

  // Check highlight status
  const isHighlighted = function (tag = ELEMENT_CHECK) {
    return (tag.getAttribute(PROPERTY_CHECK) == '1');
  }
  const setFlagHighlightedOn = function (tag = ELEMENT_CHECK) {
    tag.setAttribute(PROPERTY_CHECK, '1');
    isActive = true;
    return (true);
  }
  const setFlagHighlightedOff = function (tag = ELEMENT_CHECK) {
    tag.setAttribute(PROPERTY_CHECK, '0');
    isActive = false;
    return (false);
  }
  const toggleFlagHighlighted = function (tag = ELEMENT_CHECK) {
    if (isHighlighted(tag)) {
      setFlagHighlightedOff(tag);
      return (false);
    } else {
      setFlagHighlightedOn(tag);
      return (true);
    }
  }
  /**
   * True if initialized
   * @param {Document.HTMLElement} tag Element to use for status. Defaults to document.body.
   * @returns True when initialized. False on startup.
   */
  const isInitialized = function (tag = ELEMENT_CHECK) {
    return (tag.hasAttribute(PROPERTY_CHECK))
  }
  const initialize = function (tag = ELEMENT_CHECK) {
    if (!tag.hasAttribute(PROPERTY_CHECK)) {
      /*let elem_headers = HTMLCollection();
      let elem_navs = HTMLCollection();
      let elem_mains = HTMLCollection();
      let elem_sections = HTMLCollection();
      let elem_articles = HTMLCollection();
      let elem_asides = HTMLCollection();
      let elem_footers = HTMLCollection();
      elem_headers = initializeElementsByTagName(elem_headers, 'header');
      elem_navs = initializeElementsByTagName(elem_navs, 'nav');
      elem_mains = initializeElementsByTagName(elem_mains, 'main');
      elem_sections = initializeElementsByTagName(elem_sections, 'section');
      elem_articles = initializeElementsByTagName(elem_articles, 'article');
      elem_asides = initializeElementsByTagName(elem_asides, 'aside');
      elem_footers = initializeElementsByTagName(elem_footers, 'footer');
      divs = divs.concat(elem_headers, elem_navs, elem_mains, elem_sections, elem_articles, elem_asides, elem_footers);*/
      divs = typeof (divs) == 'undefined' ? document.querySelectorAll('div,header,nav,main,section,article,aside,footer') : divs;
      setFlagHighlightedOff(tag);
      return (true);
    }
    return (false);
  }


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
      divs[i].style.border = (divs[i].nodeName == "DIV") ? 'solid 1px ' + randomColor + 'ff' : 'dashed 2px ' + randomColor + 'ff';
      if (log) console.log('Extension running. Element is: %s. Color: %s', divs[i].nodeName, randomColor); // FOR DEBUGGING
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
  const toggleHighlight = function () {

    if (isHighlighted()) {
      clearDivs();
      setFlagHighlightedOff();
    } else {
      colorDivs();
      setFlagHighlightedOn();
    }
    if (log) logExtensionLocalStorage(); // LOG: See all keys in local storage
  }
  initialize();
  toggleHighlight();
  return (isActive);
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