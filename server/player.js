
var { Color } = require('./util/consts.js')

class Player {
    constructor(options) {
        // 初始化卡牌
        this.cards = {...Color}
        Object.keys(this.cards).forEach( key => this.cards[key] = [])
        this.money = 3
        this.freeBuilds = []
        this.handCards = []
        this.cardsName = []
        this.res = []
        this.orRes = []
    }
    build(card) {
        this.cards[card.color].push(card)
        this.freeBuilds = this.freeBuilds.concat(card.freeBuilds)
        this.cardsName.push(card.name)
        
    }
    canBuild(player,card) {
        if(player.cardName[card.name]) {
            // 同名建筑
        } else {
             if(player.freeBuilds[card.name]) {
            // 免费建设链
            } else {

            }
        }   
       
    }
}

module.exports = Player





