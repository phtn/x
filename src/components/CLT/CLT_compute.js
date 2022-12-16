function textAtomizer(args, isWord){
    let store = []
    let word = ""
    let total = 0
    if (isWord){
        args += " "
        for (let i in args){
            word += args[i]
            if (args[i] == " "){
                count(store, clean(word))
                total += 1
                word = ""
            }
        }
    } else {
        for (let i in args){
            count(store, args[i])
            total += 1
        }
    }
    
    rate(store, total)
    return sort(store)
}
const count = (store, data) => {
    let itemFound = store.find(item => item.symbol === data)
    if (itemFound){
        itemFound.count += 1
    } else {
        store.push({symbol: data, count: 1})
    }
}
const rate = (store, total) => {
    store.map(item => {
        Object.assign(item, {rate: (item.count / total).toFixed(5)})
    })
}
const sort = (store) => {
    let spaceFound = store.find(item => item.symbol === " ")
    if (spaceFound) spaceFound.symbol = "space"
    store.sort((a,b) => b.count - a.count)
    let counter = 0
    store.map(item => {
        Object.assign(item, {rank: counter += 1})
    })
    return store
}
const clean = (str) => {
    const punctuations = ['.', ',', ':', ';', '!', '?', '.' ]
    str = str.trim()
    if (punctuations.includes(str.charAt(str.length-1))){
        return str.substr(0, str.length-1)
    }
    return str
}

export { textAtomizer }