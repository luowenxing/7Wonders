
var Player = require('./player.js')
var { dividedCards } = require('./cards/CardCreator.js')
var { GameStatus } = require('./util/consts.js')

var ChoiceAction = {
    Build:'Build',
    Discard:'Discard',
    BuildWonder:'BuildWonder'
}

class Game {
    constructor(options) {
        this.playersCount = options.playersCount
        this.players = []
        this.status = GameStatus.Start
        this.age = 0
        for(let i=0;i<this.playersCount;i++) {
            this.players.push(new Player())
        }
        this.cards = dividedCards(this.playersCount)
    }
    getCurrentCards(index){
        return this.cards[this.age][index]
    }
    getNextRoundInfo(index){
        this.status = GameStatus.WaitForChoice
        return {
            players:this.players,
            index:index,
            cards:this.getCardsOfPlayer(index)
        }
    }
    getCardsOfPlayer(index){
        return this.cards[this.age][index]
    }
    shouldChoose(index,choice){
        let player = this.players[index]
        let cards = this.getCurrentCards(index)
        let chooseIndex = choice.index
        switch(choice.action) {
            case ChoiceAction.Build:
                break
            case ChoiceAction.Discard:
                cards.splice(chooseIndex,1)
                player.discard()
                break
            case ChoiceAction.BuildWonder:

                break
        }

        return {
            success:true,

        }

    }
    canBuild(index){
        let player = this.players[index]
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
module.exports = Game

