
var Player = require('./player.js')
var { dividedCards } = require('./cards/CardCreator.js')
class Game {
    constructor(options) {
        this.playersCount = options.playersCount
        this.players = []
        for(let i=0;i<this.playersCount;i++) {
            this.players.push(new Player())
        }
        this.cards = dividedCards(this.playersCount)
    }

}
module.exports = Game

