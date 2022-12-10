/**
 * Returns a random color in hex format.
 * @param {String} alpha Alpha value in hex format. 00 for 0. FF for 1. 
 * @returns A string in hex format. #RRGGBB or #RRGGBBAA if alpha is provided.
 */
const getRandomColor = function (alpha = '') {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor + alpha;
}