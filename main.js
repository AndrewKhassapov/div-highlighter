var main = function () {

    const getRandomColor = function (alpha = 'ff') {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return "#" + randomColor + alpha;
    }

    divs = document.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = getRandomColor('88');
        divs[i].style.border = 'solid ' + getRandomColor('ff');
    }
}
main();