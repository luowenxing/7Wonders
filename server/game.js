
var Player = require('./player.js')
var randomWonder = require('./cards/WonderCreator.js')
var { dividedCards } = require('./cards/CardCreator.js')
var { GameStatus,ChoiceAction } = require('./util/consts.js')

class Game {
    constructor(options) {
        this.playersCount = options.playersCount
        this.players = []
        this.status = GameStatus.Start
        this.age = 0
        let wonders = randomWonder(this.playersCount)
        for(let i=0;i<this.playersCount;i++) {
            this.players.push(new Player({
                wonder:wonders[i]
            }))
        }
        this.players.forEach( (player,index) => {
            player.leftPlayer = this.leftPlayer(index)
            player.rightPlayer = this.rightPlayer(index)
        })
        this.cards = dividedCards(this.playersCount)
        this.round = 0
        let choosed = new Array(this.playersCount)
        choosed.fill(false)
        this.choosed = choosed
    }
    get allChoosed(){
        return this.choosed.reduce( (sum,item) => (sum && item),true)
    }
    leftPlayer(index){
        let count = this.playersCount
        return this.players[(index - 1 + count ) % count]
    }
    rightPlayer(index){
        let count = this.playersCount
        return this.players[(index + 1) % count]
    }
    getGameInfo(index){
        return {
            players:this.getPlayerInfo(index),
            index:index,
            cards:this.getCardsOfPlayer(index),
            status:this.status
        }
    }
    getPlayerInfo(index) {
        return this.players.map((player,curIndex) => {
            if(index === curIndex) {
                return player.privateInfo
            } else {
                return player.publicInfo
            }
        })
    }
    getCardsOfPlayer(index){
        if(this.status === GameStatus.End) {
            return []
        }
        let step = this.age %2 === 0 ? -this.round : this.round
        let currIndex = (index + step) % this.playersCount
        currIndex = currIndex < 0 ? this.playersCount + currIndex : currIndex
        return this.cards[this.age][currIndex]
    }
    shouldChoose(index,choice){
        let result = {
            success:true,
            message:'',
        }
        let choosed = this.choosed[index]
        if(!choosed) {
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
                        result.success = false
                    }
                    break
                case ChoiceAction.Discard:
                    this.choosed[index] = true
                    cards.splice(chooseIndex,1)
                    player.discard()
                    break
                case ChoiceAction.BuildWonder:
                    if(this.canBuildWonder(index)){
                        this.choosed[index] = true
                        cards.splice(chooseIndex,1)
                        player.buildWonder(card)
                    }else {
                        result.success = false
                    }
                    break
            }
            player.updateScore()
        } else {
            result.success = false
        }
        return result
    }
    shouldNextRound() {
        if(this.allChoosed) {
            this.choosed.fill(false)
            this.round ++
            if(this.round == 6) {
                this.caculateConflict()
                this.round = 0
                if(this.age == 2) {
                    this.status = GameStatus.End
                } else {
                    this.age = this.age + 1
                    this.status = GameStatus.NextAge
                }
            } else {
                this.status = GameStatus.NextRound
            }
            return true
        }
        return false
    }
    caculateConflict(){
        let win = this.age === 0 ? 1 : (this.age === 1 ? 3 : 5)
        let lose = -1
        this.players.forEach(player =>{
            let other = player.rightPlayer
            if(player.arms > other.arms) {
                player.conflict.push(win)
                other.conflict.push(lose)
            } else if(player.arms < other.arms) {
                player.conflict.push(lose)
                other.conflict.push(win)
            }
            player.updateScore()
            other.updateScore()
        })
    }
    canBuild(index,card,choice){
        let player = this.players[index]
        return player.canBuild(card,choice)
    }
    canBuildWonder(index) {
        let player = this.players[index]
        return true
    }

}
module.exports = Game

