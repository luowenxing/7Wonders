exports.sum = function(arr) {
    return arr.reduce((sum,item) => { return sum + item },0)
}

exports.flatten = function(arr) {
    var result = []
    var flat = function(arr) {
        arr.forEach( item => {
            if(item.forEach) {
                flat(item)
            } else {
                result.push(item)
            }
        })
    }
    flat(arr)
    return result
}