
var { Technic } = require('../util/consts.js') 
var { cartesianProductOf,extend,max,min } = require('../util/util.js') 
const keys = Object.keys(Technic)

let defaultTechnic = {...Technic}
keys.forEach((key) => {
	defaultTechnic[key] = 0
})


class Technics {
	constructor(technic) {
		extend(this,defaultTechnic)
		extend(this,technic)
	}
	plus(other){
		let sum = new Technics()
		keys.forEach(key => {
			sum[key] = this[key] + other[key]
		})
		return sum
	}
	get score(){
		let squareScore = keys.reduce((sum,key) => sum + this[key] * this[key],0)
		let setScore = min(keys.map(key => this[key]))
		// 一套科技牌算7分
		return squareScore + setScore * 7
	}
}

Technics.sum = function(arr){
	return arr.reduce((total,technic) => {
		return total.plus(technic)
	},new Technics()) 
}

Technics.caculateScore = function(technicsArr,orTechnicsArr){
	let sumTechnic = Technics.sum(technicsArr)
	let cartesian = cartesianProductOf.apply(null,orTechnicsArr.map(technic => {
        let resKeys = keys.filter(key => technic[key] > 0)
        return resKeys.map(key => {
            return new Technics({
                [key]:technic[key]
            })
        })
    }))
    // 不同的科技组合
	let combinesArrOfTechnics = cartesian.map(technicArr => Technics.sum(technicArr.concat(sumTechnic)))
	return max(combinesArrOfTechnics.map(combines => combines.score))
}

module.exports = Technics