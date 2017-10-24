
const { Resource } = require('../util/consts.js')
const keys = Object.keys(Resource)
const brownKeys = [Resource.Wood,Resource.Brick,Resource.Stone,Resource.Mineral]
const greyKeys = [Resource.Cloth,Resource.Glass,Resource.Paper]

let defaultRes = {...Resource}
Object.keys(Resource).forEach((key) => {
	defaultRes[key] = 0
})

function operate(op) {
	return function(other) {
		let sum = new Resources()
		let isNumber = !(other instanceof Resources)
		keys.forEach(key => {
			sum.res[key] = op(this.res[key],isNumber ? other : other.res[key])
		})
		return sum
	}
}

class Resources {
	constructor(res) {
		this.res = {
			...defaultRes,
			...res || {}
		}
	}
	get isEnough(){
		return keys.reduce((sum,key) => {
			return sum && this.res[key] >= 0
		},true)
	}
	get wealth(){
		keys.reduce((sum,key) => {
			return sum + this.res[key]
		},0)
	}
}

Resources.sum = function(arr) {
	return arr.reduce((total,res) => {
		return total.plus(res)
	},new Resources()) 
}

Resources.prototype.plus = operate((a,b) => a + b)
Resources.prototype.mines = operate((a,b) => a - b)
Resources.prototype.multiple = operate((a,b) => a * b)

module.exports = Resources