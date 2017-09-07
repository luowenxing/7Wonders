
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
        this.roundCount = 0
        this.round = 0
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
        let currIndex = (index + this.round) % this.playersCount
        return this.cards[this.age][index + this.round]
    }
    shouldChoose(index,choice){
        this.status = GameStatus.Wait
        let player = this.players[index]
        let cards = this.getCardsOfPlayer(index)
        let chooseIndex = choice.index
        let card = cards[chooseIndex]
        let success = true
        switch(choice.action) {
            case ChoiceAction.Build:
                if(this.canBuild(index,card)){
                    cards.splice(chooseIndex,1)
                    player.build(card)
                } else {
                    success = false
                }
                break
            case ChoiceAction.Discard:
                cards.splice(chooseIndex,1)
                player.discard()
                break
            case ChoiceAction.BuildWonder:
                if(this.canBuildWonder(index)){
                    cards.splice(chooseIndex,1)
                    player.buildWonder(card)
                }else {
                    success = false
                }
                break
        }
        if(success) {
            this.shouldNextRound()
        }
        return {success}
    }
    shouldNextRound() {
        this.roundCount++
        if(this.roundCount == this.playersCount) {
            this.roundCount = 0
            this.round ++
            if(this.round == this.playersCount - 1) {
                this.round = 0
                this.age = this.age + 1
                this.status = GameStatus.NextAge
                // TODO:计算军事冲突
            } else {
                this.status = GameStatus.NextRound
            }
        }
    }
    canBuild(index,card){
        let player = this.players[index]
        if(player.cardName[card.name]) {
            // 同名建筑
        } else {
             if(player.freeBuilds[card.name]) {
            // 免费建设链
            } else {

            }
        }
        return true
    }
    canBuildWonder(index) {
        let player = this.players[index]
        return true
    }

}
module.exports = Game

