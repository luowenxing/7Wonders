
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
    }
    build(card) {
        this.cards[card.color].push(card)
        this.freeBuilds = this.freeBuilds.concat(card.freeBuilds)
        this.cardsName.push(card.name)
    }
}

module.exports = Player





