import io from 'socket.io-client'
import store from '../store/store'
import Vue from 'vue'


class GameSocket {
    constructor(store){
        var socket = io("http://192.168.1.104:8888")
        socket.on('chooseResult', result => {
            this.store.commit('updateStatus',result.status)
            var callback = this.callbacks['chooseResult']
            callback && callback()
        })

        var updateGame =  info => {
            this.store.commit('updateGame',info)
        }
        socket.on('newGame',updateGame)
        socket.on('nextRound',updateGame)
        socket.on('nextAge',updateGame)

        this.callbacks = []
        this.socket = socket 
        this.store = store
    }
    choose(choice,callback) {
        this.socket.emit('choose',choice)
        this.callbacks['chooseResult'] = callback
    }
}

 

var SocketPlugin = {
    install:function(){
        
        Vue.prototype.socket = new GameSocket(store)
    }
}

export default SocketPlugin