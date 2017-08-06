
var {
    Resource,
    Color,
    Directions,
    Technic,
    Indicators
} = require('../util/consts.js')

var {sum} = require('../util/util.js')

var defaultRes = {...Resource}
for(var x in defaultRes) {
    defaultRes[x] = 0
}

class BaseCard {
    constructor(options) {
        this.name = options.name
        this.color = options.color
        this.minPlayers = options.minPlayers || 1
        this.age = options.age
        this.basements = options.basements || []
        this.freeBuilds = options.freeBuilds || []
        this.costs = {
            ...defaultRes,
            ...options.costs || {},
        }
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
    caculate(indicators,multiple) {
        return sum(this.directions.map((direction) => {
            return sum(this.indicatorNames.map(indicatorName => {
                return indicators[direction][this.indicatorName] * multiple
            }))
        }))
    }
}  

class ResourceCard extends BaseCard {
    constructor(options) {
        super(options)
        this.res = options.res || []
        this.orRes = options.orRes || []
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
        this.orRes = {
            ...defaultRes,
            ...options.orRes || {},
        }
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
        this.technic = options.technic
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
    ResourceCard
}