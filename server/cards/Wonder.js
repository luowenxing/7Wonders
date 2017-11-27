var Resources = require('../cards/Resources.js')
var { sum } = require('../util/util.js')

class Wonder {
	constructor(options) {
		this.wonders = options.wonders
		this.name = options.name
		this.res = options.res && new Resources(options.res)
		this.choosenSide = 1
	}
	get current(){
		return this.wonders[this.choosenSide]
	}
	get currentStages(){
		let current = this.current
		return current.stages.slice(0,current.stageLevel)
	}	
	get score(){
		return sum(this.currentStages,'score')
	}
	get arms(){
		return sum(this.currentStages,'arms')
	}
	get orRes(){
		let stages = this.currentStages
		return stages.reduce((sum,stage) => {
			if(stage.orRes) {
				sum.push(stage.orRes)
			}
			return sum
		},[])
	}
}

class WonderSide {
	constructor(options) {
		this.stages = options.stages
		this.stageLevel = 2
	}
}

class Stage {
	constructor(options) {
		this.stageName = options.stageName
		this.orRes = options.orRes && new Resources(options.orRes)
		this.costs = options.costs && new Resources(options.costs)
		this.directions = options.directions
		this.buyRes = options.buyRes || []
		this.score = options.score || 0
		this.money = options.money || 0
		this.arms = options.arms || 0
		this.ability = options.ability
		this.card = ''
	}
}

module.exports = {
	Wonder,
	WonderSide,
	Stage
}