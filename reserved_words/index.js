const jsList = require("./javascript");
const tsList = require("./typescript");

const concat = (arr1, arr2) => arr1.concat(arr2);
const unique = (arr) => arr.reduce((newArr, val) => newArr.includes(val) ? newArr : newArr.concat([val]));

const combinedLists = concat(jsList, tsList)

module.exports = unique(combinedLists);