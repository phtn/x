// "use strict";
exports.__esModule = true;
exports.textAtomizer = void 0;
function textAtomizer(args, isWord, withSpace) {
    var store = [];
    var word = "";
    var total = 0;
    if (isWord) {
        args += " ";
        for (var i in args) {
            word += args[i];
            if (args[i] === " ") {
                count(store, clean(word));
                total += 1;
                word = "";
            }
        }
    }
    else {
        for (var j in args) {
            if (withSpace) {
                count(store, args[j]);
                total += 1;
            }
            else {
                if (args[j] !== " ") {
                    count(store, args[j]);
                    total += 1;
                }
            }
        }
    }
    rate(store, total);
    return sort(store);
}
exports.textAtomizer = textAtomizer;
var count = function (store, data) {
    var itemFound = store.find(function (item) { return item.symbol === data; });
    if (itemFound) {
        itemFound.count += 1;
    }
    else {
        store.push({ symbol: data, count: 1 });
    }
};
var rate = function (store, total) {
    store.map(function (item) {
        return Object.assign(item, { rate: (item.count / total).toFixed(5) });
    });
};
var sort = function (store) {
    var spaceFound = store.find(function (item) { return item.symbol === " "; });
    if (spaceFound)
        spaceFound.symbol = "space";
    store.sort(function (a, b) { return b.count - a.count; });
    var counter = 0;
    store.map(function (item) {
        return Object.assign(item, { rank: counter += 1 });
    });
    return store;
};
var clean = function (str) {
    var punctuations = ['.', ',', ':', ';', '!', '?', '.'];
    str = str.trim();
    if (punctuations.includes(str.charAt(str.length - 1))) {
        return str.substring(0, str.length - 1);
    }
    return str;
};
