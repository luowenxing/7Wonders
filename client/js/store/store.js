import Vue from 'vue'
import Vuex from 'vuex'
import { GameStatus } from 'shared/util/consts'
import getters from './getters.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        players:[],
        index:0,
        cards:[],
        status:0
    },
    getters,
    mutations:{
        updateGame(store,info){
            store.players = info.players
            store.index = info.index
            store.cards = info.cards
            store.status = info.status
            console.log(info.cards)
            console.log(store.status)
        },
        updateStatus(store,status) {
            store.status = status
            console.log(store.status)
        },
        chooseCard(store,index) {
            store.status = GameStatus.NeedChoose
            store.cards.splice(index,1)
        },
        insertCard(store,{index,card}){
            store.cards.splice(index,0,card)
        }
    }
})