var Resources = require('../cards/Resources.js')


class Wonder {
	constructor(options) {
		this.wonders = options.wonders
		this.name = options.name
		this.res = options.res && new Resources(options.res)
		this.choosenSide = 0
	}
	get current(){
		return this.wonders[this.choosenSide]
	}
}

class WonderSide {
	constructor(options) {
		this.stages = options.stages
		this.stageLevel = 0
	}
}

class Stage {
	constructor(options) {
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