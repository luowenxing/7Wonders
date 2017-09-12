import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        players:[],
        index:0,
        cards:[]
    },
    getters: {
        currentPlayer(state){
            return state.players[state.index]
        }
    },
    mutations:{
        updateGame(store,info){
            store.players = info.players
            store.index = info.index
            store.cards = info.cards
        }
    }
})