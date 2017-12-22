
var {
    Color,
    Directions,
    Technic,
    Indicators
} = require('../util/consts.js')
var {sum} = require('../util/util.js')
var uuidv4 = require('uuid/v4')
var Resources = require('./Resources.js')
var Technics = require('./Technics.js')

class BaseCard {
    constructor(options) {
        this.uuid = uuidv4()
        this.name = options.name
        this.color = options.color
        this.minPlayers = options.minPlayers || 1
        this.age = options.age
        this.basements = options.basements || []
        this.freeBuilds = options.freeBuilds || []
        this.costs = new Resources(options.costs)
    }
    caculateScore() {
        return 0
    }
}

var IndicatorCardMixin = Base => class extends Base {
    constructor(options) {
        super(options)
        this.directions = options.directions || []
        this.indicatorNames = options.indicatorNames || []
    }
    caculate(players,multiple) {
        return sum(this.directions.map((direction) => {
            return sum(this.indicatorNames.map(indicatorName => {
                return players[direction][indicatorName]() * multiple
            }))
        }))
    }
}  

class ResourceCard extends BaseCard {
    constructor(options) {
        super(options)
        this.res = options.res && new Resources(options.res)
        this.orRes = options.orRes && new Resources(options.orRes)
        this.costMoney = options.costMoney || 0
    }
}



class TradeCard extends BaseCard {
    constructor(options) {
        super(options)
        this.money = options.money || 0
        this.color = Color.Yellow
    }

    caculateMoney() {
        return this.money
    }
}


class TradeResOwnCard extends TradeCard {
    constructor(options) {
        super(options)
        this.res = options.res && new Resources(options.res)
        this.orRes = options.orRes && new Resources(options.orRes)
    }
}

class TradeResCard extends TradeCard {
    constructor(options) {
        super(options)
        this.directions = options.directions || []
        this.buyRes = options.buyRes 
    }
}

class TradeFuncCard extends IndicatorCardMixin(TradeCard) {
    constructor(options) {
        super(options)
        this.moneyMul = options.moneyMul || 0
        this.scoreMul = options.scoreMul || 0
    }

    caculateMoney(players) {
        return this.caculate(players,this.moneyMul)
    }

    caculateScore(players) {
        return this.caculate(players,this.scoreMul)
    }

}

class TechnicCard extends BaseCard {
    constructor(options) {
        super(options)
        this.technics = new Technics(options.technics)
        this.color = Color.Green
    }
}

class WarCard extends BaseCard {
    constructor(options) {
        super(options)
        this.arms = options.arms || 1
        this.color = Color.Red
    }
}

class GuildCard extends IndicatorCardMixin(BaseCard) {
    constructor(options) {
        super(options)
        this.scoreMul = options.scoreMul || 0
        this.age = 3
        this.color = Color.Purple
        this.orTechnics = options.orTechnics
    }
    caculateScore(players) {
        return this.caculate(players,this.scoreMul)
    }
}

class InfrastructureCard extends BaseCard {
    constructor(options) {
        super(options)
        this.score = options.score || 0
        this.color = Color.Blue
    }
    caculateScore() {
        return this.score
    }
}

module.exports = {
    InfrastructureCard,
    GuildCard,
    WarCard,
    TechnicCard,
    TradeFuncCard,
    TradeResOwnCard,
    TradeResCard,
    TradeCard,
    ResourceCard,
}