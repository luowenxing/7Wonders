import Player from 'shared/player.js'

export default {
    currentPlayer(state) {
        return new Player(state.players[state.index])
    },
    leftPlayer(state) {
    	let count = state.players.length
    	let index = state.index
        return new Player(state.players[(index - 1 + count ) % count])
    },
    rightPlayer(state) {
    	let count = state.players.length
    	let index = state.index
        return new Player(state.players[(index + 1) % count])
    }
}