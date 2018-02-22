import { Indicators } from 'shared/util/consts.js'
import Resources from 'shared/cards/Resources'
import { cartesianProductOf,distinct,groupBy} from 'shared/util/util'

export function resRepresent(res) {
	return Object.keys(res).reduce((result,key) => {
        let count = res[key]
        for(var index = 0;index < count;index ++) {
            result.push({
            	imageName:key,
            	innerText:''
            })
        }
        return result
    },[])
}


export function cardCostsRepresent(card) {
	let res = card.costs
    let cost = resRepresent(res)
    if(typeof card.costMoney === 'number' && card.costMoney > 0) {
    	cost.unshift({
    		imageName:Indicators.Money,
    		innerText:card.costMoney
    	})
    }
    return cost
}

export function cardEffectRepresent(card) {
	let effects = []
	if(card.res) {
		return resRepresent(card.res)
	}
	if(card.orRes) {
		// OR资源在另一列显示，需要分割线
		return []
	}
	if(card.score) {
		effects.push({
			imageName:Indicators.Score,
			innerText:card.score
		})
	}
	if(card.arms) {
		let arms = card.arms
		for(var i=0;i<arms;i++) {
			effects.push({
				imageName:Indicators.Arms,
				innerText:''
			})
		}
	}
	if(card.technics) {
		let technics = card.technics
		Object.keys(technics).forEach((key) => {
	        let count = technics[key]
	        for(var index = 0;index < count;index ++) {
	            effects.push({
	            	imageName:key,
	            	innerText:''
	            })
	        }
	    })
	}
	if(card.money) {
		effects.push({
			imageName:Indicators.Money,
			innerText:card.money
		})
	}
	if(effects.length === 0 && card.name) {
		effects.push({
			imageName:card.name,
			innerText:'',
			width:'100%'
		})
	}
	if(card.stageName) {
		effects.push({
			imageName:card.stageName,
			innerText:'',
			width:'100%'
		})
	}
	return effects
}


export function	getCanBuildCard(card) {
	let result = {
		success:true,
		needTrade:false,
		tradesResultArr:[],
	}
	let player = this.currentPlayer
	if(player.cardsName.indexOf(card.name) >= 0) {
        // 同名建筑
        result.success = false
    } else {
        // 免费建设链
        if(player.freeBuilds.indexOf(card.name) < 0) {
          	result = canBuild.call(this,card.costs)
		} 
	}
	return result
}

export function	canBuild(needRes) {
	let result = {
		success:true,
		needTrade:false,
		tradesResultArr:[],
	}
	let player = this.currentPlayer
	let resObj = player.ownRes
	let hasOwnRes = Resources.hasRes(resObj,needRes)
	// 先判断自己是否有充足的资源
	if(!hasOwnRes.result) {
		// 先判断自己是否有充足的资源，无充足资源，考虑交易
		// 获取到所有资源组合情况下，还差的资源
		let tradesResultArr = []
		let resArrDiff = hasOwnRes.resArr.map(res => res.diff)
		// 去除重复的组合
		let dictinctResArr = distinct(resArrDiff,(res1,res2) => res1.equals(res2))
		let leftPlayer = this.leftPlayer
		let rightPlayer = this.rightPlayer
		// 构建所有的交易组合
		dictinctResArr.forEach(res => {
			let trades = res.mapPositive(key => {
				let tradesForKey = []
				let count = res[key]
				for(let index=0;index<=count;index++) {
					tradesForKey.push({
						key:key,
						left:index,
						right:count - index
					})
				}
				return tradesForKey
			})
			// 笛卡尔积
			let tradesCartesian = cartesianProductOf.apply(null,trades)
			tradesCartesian.forEach(trade => {
				let trades = trade.reduce((result,resObj) => {
					result[0].res = result[0].res.plus(new Resources({
						[resObj.key]:resObj.left
					}))
					result[1].res = result[1].res.plus(new Resources({
						[resObj.key]:resObj.right
					}))
					return result
				},[{
					res:new Resources(),
					player:leftPlayer
				},{
					res:new Resources(),
					player:rightPlayer
				}])
				let tradesResult = player.canTrade(trades)
				if(tradesResult.success) {
					tradesResultArr.push(tradesResult.trades)
				}
			})
		})
		result.tradesResultArr = tradesResultArr

		if(tradesResultArr.length > 0) {
			result.needTrade = true
		} else {// 无可行则不能建造
			result.success = false
		}
	}
	return result
}

export function getCanBuildWonder(){
	let wonder = this.currentPlayer.wonder
	let result = {
		success:true,
		needTrade:false,
		tradesResultArr:[],
	}
	let player = this.currentPlayer
	if(wonder.current.stages.length === wonder.current.stageLevel) {
		// 奇迹已经建设完成
		result.success = false
		return result
	} else {
		let costs = wonder.costs
		return canBuild.call(this,costs)
	}
}





