
const { Resource,Color } = require('../util/consts.js')
const { cartesianProductOf,extend } = require('../util/util.js')
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
		let isNumber = typeof other === 'number'
		keys.forEach(key => {
			sum[key] = op(this[key],isNumber ? other : other[key])
		})
		return sum
	}
}

class Resources {
	constructor(res) {
		extend(this,{
			...defaultRes,
			...res || {}
		})
	}
	get isEnough(){
		return keys.reduce((sum,key) => {
			return sum && this[key] >= 0
		},true)
	}
	get isEmpty(){
		return keys.reduce((sum,key) => {
			return sum && this[key] == 0
		},true)
	}
	get wealth(){
		return keys.reduce((sum,key) => {
			return sum + this[key]
		},0)
	}
	get diff() {
		let result = new Resources()
		keys.forEach(key => {
			let count = this[key]
			if(count < 0) {
				result[key] = -this[key]
			}
		})
		return result
	}
	get color(){
		return brownKeys.reduce((result,key) => {
			return result || this[key] > 0
		},false) ? Color.Brown : Color.Grey
	}
	mul(res2) {
		return keys.reduce((sum,key) => {
			return sum + this[key] * res2[key]
		},0)
	}
	equals(res2) {
		return keys.reduce((result,key) => {
			return result && this[key] === res2[key]
		},true)
	}
	mapPositive(op) {
		return keys.filter(key => this[key] > 0).map(op)
	}
	caculateWealth() {
		
	}
}

Resources.sum = function(arr) {
	return arr.reduce((total,res) => {
		return total.plus(res)
	},new Resources()) 
}

Resources.hasRes = function(resObj,needRes) {
	let res = resObj.res
    let restRes = res.mines(needRes)
    if(restRes.isEnough) {
        // 自有资源满足
        return {result:true}
    } else {
        // 检查Or资源
        let orRes = resObj.orRes
        // 取笛卡尔积 可优化
        let cartesian = cartesianProductOf.apply(null,orRes.map(res => {
            let resKeys = keys.filter(key => res[key] > 0)
            return resKeys.map(key => {
                return new Resources({
                    [key]:res[key]
                })
            })
        }))
        let avaliableRes = cartesian.map(resArr => Resources.sum(resArr))
        let resArr = avaliableRes.map(res => res.plus(restRes))
        return {
            resArr,
            result:resArr.reduce((sum,res) => sum || res.isEnough,false),
        }
    }
}

Resources.prototype.plus = operate((a,b) => a + b)
Resources.prototype.mines = operate((a,b) => a - b)
Resources.prototype.multiple = operate((a,b) => a * b)

module.exports = Resources