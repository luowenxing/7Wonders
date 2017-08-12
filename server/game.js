
var Player = require('./player.js')
var CardCreator = require('./cards/CardCreator.js')
class Game {
    constructor(options) {
        this.playersCount = options.playersCount
        this.players = []
        for(let i=0;i<this.playersCount;i++) {
            this.players.push(new Player())
        }
        this.players.forEach((player,index) => {
            let leftIndex = index - 1 < 0 ? this.playersCount - 1 : index - 1
            let rightIndex = ( index + 1 ) % this.playersCount
            player.left = this.players[leftIndex] 
            player.right = this.players[rightIndex]
        })
        this.cards = CardCreator(this.playersCount)
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
    getPlayers() {

    }
}