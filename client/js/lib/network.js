import io from 'socket.io-client'
import { allCards } from '../../../shared/cards/CardCreator.js'
var socket = io("http://localhost:8888")
socket.on('newGame',function(game) {
    let cards = allCards(game.players)
})

export default socket