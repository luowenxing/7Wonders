
var { Color } = require('./util/consts.js')
var Resources = require('./cards/Resources.js')
var { cartesianProductOf } = require('./util/util.js')
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
        this.cards = {...Color}
        Object.keys(this.cards).forEach( key => this.cards[key] = [])
        this.money = 3
        this.freeBuilds = []
        this.cardsName = []
        this.ownRes = {
            res:new Resources(),
            orRes:[]
        }
        this.sellRes = {
            res:new Resources(),
            orRes:[]
        }   
        this.leftPlayer = undefined
        this.rightPlayer = undefined
        // TODO:Indicator指示器
    }
    get publicInfo(){
        return {
            cards:this.cards,
            money:this.money,
        }
    }
    get privateInfo(){
        return {
            cards:this.cards,
            money:this.money,
            wonderCard:[] // TODO隐藏的奇迹卡牌
        }
    }
    build(card) {
        this.cards[card.color].push(card)
        this.freeBuilds = this.freeBuilds.concat(card.freeBuilds)
        this.cardsName.push(card.name)
        if(card instanceof ResourceCard) {
            // 资源牌，增加可出售资源
            if(card.res) {
                this.sellRes.res = this.sellRes.res.plus(card.res)
            }
            if(card.orRes) {
                this.sellRes.orRes.push(card.orRes)
            }
        }
        if(card instanceof ResourceCard || card instanceof TradeResOwnCard) {
            // 资源牌或者贸易资源牌，增加自己的资源
            if(card.res) {
                this.ownRes.res = this.ownRes.res.plus(card.res)
            }
            if(card.orRes) {
                this.ownRes.orRes.push(card.orRes)
            }
        } 

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
                let trade = choice.trade
                let tradeResSum = new Resources()
                if(trade) { // 验证交易
                    if(trade.left) {
                        let tradeRes = new Resources(trade.left)
                        let leftTrade = this.caculateTrade(tradeRes,this.leftPlayer)
                        if(leftTrade) {
                            costMoney += leftTrade
                            tradeResSum = tradeResSum.plus(tradeRes)
                        } else {
                            // 交易验证失败
                            return false
                        }
                    }
                    if(trade.right) {
                        let tradeRes = new Resources(trade.right)
                        let rightTrade = this.caculateTrade(tradeRes,this.rightPlayer)
                        if(rightTrade) {
                            costMoney += rightTrade
                            tradeResSum = tradeResSum.plus(tradeRes)
                        } else {
                            // 交易验证失败
                            return false
                        }
                    }
                }
                if(this.money < costMoney) { // 不够钱
                    return false
                }
                // 增加了购买的资源
                let nowRes = {
                    res:this.ownRes.res.plus(tradeResSum),
                    orRes:this.ownRes.orRes
                }
                if(this.hasRes(nowRes,card.costs)) {
                    if(typeof card.costMoney === 'number') {
                        this.money -= card.costMoney
                    }
                    this.money -= costMoney
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
    hasRes(resObj,needRes) {
        let res = resObj.res
        let restRes = res.mines(needRes)
        if(restRes.isEnough) {
            // 自有资源满足
            return true
        } else {
            // 检查Or资源
            let orRes = resObj.orRes
            // 取笛卡尔积 可优化
            let cartesian = cartesianProductOf.apply(null,orRes.map(resObj => {
                let res = resObj.res
                let resKeys = Object.keys(res).filter(key => res[key] > 0)
                return resKeys.map(key => {
                    return new Resources({
                        [key]:res[key]
                    })
                })
            }))
            let avaliableRes = cartesian.map(resArr => Resources.sum(resArr))
            return avaliableRes.reduce((result,res) => {
                // 只需满足笛卡尔积中的一种情况就行
                return result || res.plus(restRes).isEnough
            },false)
        }
    }
    caculateTrade(tradeRes,toPlayer){
        if(toPlayer.hasRes(toPlayer.sellRes,tradeRes)) {
            // 计算花费，TODO:考虑Trade贸易卡
            return tradeRes.wealth * 2
        } else {
            return false
        }
    }
}

module.exports = Player





