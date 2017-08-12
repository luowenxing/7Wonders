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

exports.groupBy = function(arr,condition) {
    var result = {}
    arr.forEach( item => {
        var key = condition(item)
        result[key] = result[key] || []
        result[key].push(item)
    })
    return result
}

exports.shuffle = function(arr) {
    var temp = null,swapIndex = 0
        length = arr.length
    for(var i=0;i<length;i++) {
        swapIndex = Math.floor(Math.random() * length)
        temp = arr[i] 
        arr[i] = arr[swapIndex]
        arr[swapIndex] = temp
    }
    return arr
}

exports.divide = function(arr,parts) {
    var index = 0,
        length = arr.length,
        results = [],
        steps = Math.ceil(length / parts)
    while(index < arr.length) {
        results.push(arr.slice(index,index+steps))
        index = index + steps
    }
    return results
}
