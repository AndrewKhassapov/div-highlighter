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
    const divs = document.querySelectorAll('div,header,nav,main,section,article,aside,footer');
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
            divs[i].style.border = (divs[i].nodeName == "DIV") ? 'solid 1px ' + randomColor + 'ff' : 'dashed 2px ' + randomColor + 'ff';
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