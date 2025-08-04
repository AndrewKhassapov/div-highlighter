/**
 * Div Highlighter
 * Source code for javascript scratchpad
 * @description Highlights web framing elements, <div> and analogous.
 * @author Andrew Khassapov
 * @version
 * @param {Boolean} highlight True to assign random colours. False to restore. 
 */
var main = function (highlight = true) {

    const getRandomColor = function (alpha = '') {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return "#" + randomColor + alpha;
    }

    const divs = document.getElementsByTagName('div');
    function initializeElementsByTagName(varName, tagName = "") {
        varName = (typeof (varName) == 'undefined' ? document.getElementsByTagName(tagName) : varName);
        return varName;
    }
    let elem_headers = initializeElementsByTagName(elem_headers, 'header');
    let elem_navs = initializeElementsByTagName(elem_navs, 'nav');
    let elem_mains = initializeElementsByTagName(elem_mains, 'main');
    let elem_sections = initializeElementsByTagName(elem_sections, 'section');
    let elem_articles = initializeElementsByTagName(elem_articles, 'article');
    let elem_asides = initializeElementsByTagName(elem_asides, 'aside');
    let elem_footers = initializeElementsByTagName(elem_footers, 'footer');
    divs = divs.concat(elem_headers, elem_navs, elem_mains, elem_sections, elem_articles, elem_asides, elem_footers);

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
    if (highlight) { changeDivColor(); }

    const restoreDivColor = function () {
        for (let i = 0; i < divs.length; i++) {
            divs[i].style.backgroundColor = divsInitial[i].style.backgroundColor ? divsInitial[i].style.backgroundColor : '';
            divs[i].style.border = divsInitial[i].style.border ? divsInitial[i].style.border : '';
        }
    }
    if (!highlight) { restoreDivColor(); }

}
main();