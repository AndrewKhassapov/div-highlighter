var main = function () {

    const getRandomColor = function (alpha = '') {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return "#" + randomColor + alpha;
    }

    divs = document.getElementsByTagName('div');

    const changeDivColor = function () {
        for (let i = 0; i < divs.length; i++) {
            const randomColor = getRandomColor();
            divs[i].style.backgroundColor = randomColor + '88';
            divs[i].style.border = 'solid ' + randomColor + 'ff';
        }
    }
    changeDivColor();
}
main();