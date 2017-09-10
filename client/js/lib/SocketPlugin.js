import io from 'socket.io-client'
import store from '../store/store'
import Vue from 'vue'

var SocketPlugin = {
    install:function(){
        var socket = io("http://localhost:8888")
        var updateGame = function(info) {
            store.commit('updateGame',info)
        }
        socket.on('newGame',updateGame)
        socket.on('nextRound',updateGame)
        socket.on('nextAge',updateGame)

        socket.on('chooseResult',function(){

        })

        Vue.prototype.socket = {
            choose(choice) {
                socket.emit('choose',choice)
            }
        }
    }
}

export default SocketPlugin