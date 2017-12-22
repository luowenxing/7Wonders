import { Indicators } from 'shared/util/consts.js'

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



