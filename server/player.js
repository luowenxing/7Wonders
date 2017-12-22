
var { Color,Indicators } = require('./util/consts.js')
var Resources = require('./cards/Resources.js')
var { flatten,extend,sum } = require('./util/util.js')
var { Wonder } = require('./cards/Wonder.js')
var Technics = require('./cards/Technics.js')
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
        var defaultCards = {...Color}
        Object.keys(defaultCards).forEach( key => defaultCards[key] = [])
        var defaultOptions = {
            money:3,
            wonder:null,
            cards:defaultCards,
            leftPlayer:null,
            rightPlayer:null,
            score:0,
            lose:0,
            win:0
        }
        extend(this,{
            ...defaultOptions,
            ...options,
        })
        if(this.wonder) {
            this.wonder = new Wonder(this.wonder)
        }
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
        // 增加奇迹提供的资源
        res.push(this.wonder.res)
        orRes = orRes.concat(this.wonder.orRes)

        return {
            res:new Resources({
                Wood:100,
                Brick:100,
                Stone:100,
                Mineral:100,
                Cloth:100,
                Glass:100,
                Paper:100
            }),
            orRes
        }

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
        res.push(this.wonder.res)
        return {
            res:Resources.sum(res),
            orRes
        }
    }
    get publicInfo(){
        return {
            cards:this.cards,
            money:this.money,
            score:this.score,
            wonder:this.wonder
        }
    }
    get privateInfo(){
        return {
            cards:this.cards,
            money:this.money,
            score:this.score,
            wonder:this.wonder
        }
    }
    get arms(){
        let cardArms = sum(this.cards[Color.Red],'arms')
        let wonderArms = this.wonder.arms
        return cardArms + wonderArms
    }
    get technics(){
        let technics = this.cards[Color.Green].map(card => card.technics)
        let cardOrTechnics = this.cards[Color.Purple].filter(card => card.orTechnics).map(card => card.orTechnics)
        let orTechnics = this.wonder.orTechnics.concat(cardOrTechnics)
        return {
            technics,
            orTechnics
        }
    }
    build(card) {
        this.cards[card.color].push(card)
        this.updateScore()

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
                    // 修建成功
                    // TODO 应该放在build方法里，这个方法应该是不修改状态的
                    this.money -= (costMoney + cardCostMoney)
                    if(card.caculateMoney) {
                        // 计算这张卡增加的money
                        this.money += card.caculateMoney([this.leftPlayer,this,this.rightPlayer])
                    }

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
    updateScore(){
        let blueScore = sum(this.cards[Color.Blue],'score')
        let moneyScore = this.money / 3
        let wonderScore = this.wonder.score
        // 计算黄色、紫色卡牌等需要计算左右两边的卡牌的分数
        let indicatorsCards = this.cards[Color.Yellow].concat(this.cards[Color.Purple])
        let indicatorsScore = indicatorsCards.reduce((sum,card) => {
            return sum + card.caculateScore([this.leftPlayer,this,this.rightPlayer])
        },0)
        // 计算科技牌
        let technicsObj = this.technics
        let technicsScore = Technics.caculateScore(technicsObj.technics,technicsObj.orTechnics)

        this.score =  blueScore + moneyScore + wonderScore + indicatorsScore + technicsScore
    }
}


// Player中需要向Card暴露的方法，用于计算卡片的分数
Object.keys(Color).forEach(color => {
    Player.prototype[color] = function(){
        return this.cards[color].length
    }
})
Player.prototype[Indicators.Wonders] = function(){
    return this.wonder.current.stageLevel
}
Player.prototype[Indicators.Lose] = function(){
    return this.lose
}



module.exports = Player





