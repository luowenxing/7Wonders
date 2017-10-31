export function getResInArr(res) {
    return Object.keys(res).reduce((result,key) => {
        let count = res[key]
        for(var index = 0;index < count;index ++) {
            result.push(key)
        }
        return result
    },[])
}

export function getCardIndicator(card) {

}