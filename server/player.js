
var { Color } = require('./util/consts.js')
var Resources = require('./cards/Resources.js')
var { flatten } = require('./util/util.js')
var {
    InfrastructureCard,
    GuildCard,
    WarCard,
    TechnicCard,
    TradeFuncCard,
    TradeResCard,
    TradeResOwnCard,
    TradeCard,
    ResourceCard
}  = require('./cards/Card.js')

class Player {
    constructor(options) {
        // 初始化卡牌
        this.wonder = options.wonder
        this.money = options.money || 3
        if(options.cards) {
            this.cards = options.cards
        } else {
            this.cards = {...Color}
            Object.keys(this.cards).forEach( key => this.cards[key] = [])
        }
        // TODO:Indicator指示器
    }
    get allCards() {
        return flatten(Object.keys(this.cards).map(key => this.cards[key]))
    }
    get freeBuilds() {
        return this.allCards.reduce((sum,card) => sum.concat(card.freeBuilds),[])
    }
    get cardsName(){
        return this.allCards.reduce((sum,card) => sum.concat(card.name),[])
    }
    get ownRes(){
        let res = []
        let orRes = []
        this.allCards.forEach(card => {
            card.res && res.push(card.res)
            card.orRes && orRes.push(card.orRes)
        })
        return {
            res:Resources.sum(res),
            orRes
        }
    }
    get sellRes(){
        let res = []
        let orRes = []
        this.allCards.forEach(card => {
            // 只能出售资源牌，贸易牌提供的不能出售
            if(card.color === Color.Brown || card.color === Color.Grey) {
                card.res && res.push(card.res)
                card.orRes && orRes.push(card.orRes)
            }
        })
        return {
            res:Resources.sum(res),
            orRes
        }
    }
    get publicInfo(){
        return {
            cards:this.cards,
            money:this.money,
            wonder:this.wonder
        }
    }
    get privateInfo(){
        return {
            cards:this.cards,
            money:this.money,
            wonder:this.wonder
        }
    }
    build(card) {
        this.cards[card.color].push(card)
    }
    canBuild(card,choice) {
        if(this.cardsName[card.name]) {
            // 同名建筑
            return false
        } else {
            // 免费建设链
            if(this.freeBuilds[card.name]) {
                return true
            } else {
                let costMoney = 0
                let cardCostMoney = card.costMoney || 0
                let trade = choice.trade
                let tradeResSum = new Resources()
                if(trade instanceof Array && trade.length === 2) {
                    trade[0].player = this.leftPlayer
                    trade[1].player = this.rightPlayer
                    trade.forEach(t => t.res = new Resources(t.res))
                    let result = this.canTrade(trade)
                    if(result.success) {
                        costMoney = result.costMoney
                        tradeResSum = Resources.sum(result.trades.map(trade => trade.res))
                    }
                }

                if(this.money < (costMoney + cardCostMoney)) { // 不够钱
                    return false
                }
                // 增加了购买的资源
                let ownRes = this.ownRes
                let nowRes = {
                    res:ownRes.res.plus(tradeResSum),
                    orRes:ownRes.orRes
                }
                if(Resources.hasRes(nowRes,card.costs).result) {
                    this.money -= (costMoney + cardCostMoney)
                    if(trade instanceof Array && trade.length === 2) { 
                        // 有交易，加钱
                        this.leftPlayer.money += trade[0].costMoney
                        this.rightPlayer.money += trade[1].costMoney
                    }
                    return true
                } else {
                    return false // 资源不够
                }

            }
        }
        return false
    }
    buildWonder(card) {
        
    }
    // 弃掉一张，+3元
    discard(){
        this.money += 3
    }

    canTrade(trades) {
        let result = trades.reduce((result,trade) => {
            if(result.success) { // 任何一个失败代表交易不可行
                let res = trade.res
                let player = trade.player
                let costMoney = this.caculateTrade(res,player)
                if(costMoney >= 0) {
                    trade.costMoney = costMoney
                    result.trades.push(trade)
                } else {
                    // 交易验证失败，没有这么多资源
                    result.success = false
                }
            }
            return result
        },{success:true,trades:[]})
        if(result.success) {
            // 钱够不够
            let costMoney = trades.reduce((sum,trade) => sum + (trade.costMoney || 0),0)
            result.success = this.money >= costMoney
            if(result.success) {
                result.costMoney = costMoney
            }
        }
        return result
    }

    caculateTrade(tradeRes,toPlayer){
        if(Resources.hasRes(toPlayer.sellRes,tradeRes).result) {
            // 计算花费，TODO:考虑Trade贸易卡
            return tradeRes.wealth * 2
        } else {
            return -1
        }
    }
}

module.exports = Player





