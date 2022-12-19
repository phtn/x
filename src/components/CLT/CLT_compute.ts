type StoreTypes = {
    symbol: string,
    count: number,
    rate?: number,
}

function textAtomizer(args: any, isWord: boolean) {
    let store: Array<StoreTypes> = []
    let word = ""
    let total = 0
    if (isWord) {
        args += " "
        for (let i in args) {
            word += args[i]
            if (args[i] == " ") {
                count(store, clean(word))
                total += 1
                word = ""
            }
        }
    } else {
        for (let i in args) {
            count(store, args[i])
            total += 1
        }
    }

    rate(store, total)
    return sort(store)
}
const count = (store: Array<StoreTypes>, data: string) => {
    let itemFound = store.find(item => item.symbol === data)
    if (itemFound) {
        itemFound.count += 1
    } else {
        store.push({ symbol: data, count: 1 })
    }
}
const rate = (store: Array<StoreTypes>, total: number) => {
    store.map(item => {
        Object.assign(item, { rate: (item.count / total).toFixed(5) })
    })
}
const sort = (store: Array<StoreTypes>) => {
    let spaceFound = store.find((item) => item.symbol === " ")
    if (spaceFound) spaceFound.symbol = "space"
    store.sort((a, b) => b.count - a.count)
    let counter = 0
    store.map(item => {
        Object.assign(item, { rank: counter += 1 })
    })
    return store
}
const clean = (str: string) => {
    const punctuations = ['.', ',', ':', ';', '!', '?', '.']
    str = str.trim()
    if (punctuations.includes(str.charAt(str.length - 1))) {
        return str.substring(0, str.length - 1)
    }
    return str
}

export { textAtomizer }