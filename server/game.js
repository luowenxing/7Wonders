
var Player = require('./player.js')
var { dividedCards } = require('./cards/CardCreator.js')
var { GameStatus,ChoiceAction } = require('./util/consts.js')

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
        this.round = 0
        let choosed = new Array(this.playersCount)
        choosed.fill(false)
        this.choosed = choosed
    }
    get allChoosed(){
        return this.choosed.reduce( (item,sum) => (sum && item),true)
    }
    getGameInfo(index){
        return {
            players:this.players,
            index:index,
            cards:this.getCardsOfPlayer(index),
            status:this.status
        }
    }
    getCardsOfPlayer(index){
        let step = this.age %2 === 0 ? -this.round : this.round
        let currIndex = (index + step) % this.playersCount
        currIndex = currIndex < 0 ? this.playersCount + currIndex : currIndex
        return this.cards[this.age][currIndex]
    }
    shouldChoose(index,choice){
        let result = {
            success:false,
            message:
        }
        let choosed = this.choosed[index]
        if(choosed) {
            success = false
        } else {
            this.status = GameStatus.WaitForChoice
            let player = this.players[index]
            let cards = this.getCardsOfPlayer(index)
            let chooseIndex = choice.index
            let card = cards[chooseIndex]
            switch(choice.action) {
                case ChoiceAction.Build:
                    if(this.canBuild(index,card,choice)){
                        this.choosed[index] = true
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
        }
        return {success}
    }
    shouldNextRound() {
        if(this.allChoosed) {
            this.choosed.fill(false)
            this.round ++
            if(this.round == 6) {
                this.round = 0
                this.age = this.age + 1
                this.status = GameStatus.NextAge
                // TODO:计算军事冲突
            } else {
                this.status = GameStatus.NextRound
            }
        }
    }
    canBuild(index,card,choice){
        let player = this.players[index]
        let result = {
            success
        }
        if(player.cardsName[card.name]) {
            // 同名建筑
            return false
        } else {
             if(player.freeBuilds[card.name]) {
                return true
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

