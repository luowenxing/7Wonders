import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        players:[],
        index:0,
        cards:[]
    },
    mutations:{
        updateGame(store,info){
            store.players = info.players
            store.index = info.index
            store.cards = info.cards
        }
    }
})