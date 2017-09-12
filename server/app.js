let express = require('express');
let path = require('path');
let socket = require('socket.io');
let router = express.Router();
let app = express();
let server = require('http').Server(app);
let Game = require('./game.js')
let { GameStatus } = require('./util/consts.js')
app.use(express.static(path.resolve(__dirname,'../client')));
server.listen(8888,function() {
    console.log('server started')
})
// 创建socket服务
let sio = socket(server);
let clients = []
let game

sio.on('connection',function(socket) {
    console.log('player in')
    if(clients.filter( x => socket.id === x.id ).length == 0) {
        socket.index = clients.length
        clients.push(socket)
    }
    if(clients.length === 4) {
        console.log('new game')
        game = new Game({
            playersCount:clients.length
        })
        clients.forEach( (client,index) => {
            client.emit('newGame',game.getNextRoundInfo(index))
        }) 
    }

    socket.on('choose',function(choice){
        console.log('player choose')
        let result = game.shouldChoose(socket.index,choice)
        let success = result.success
        socket.emit('chooseResult',{success})
        if(success) {
            switch(game.status) {
                // 是否所有人选择完毕，进入下一轮
                case GameStatus.NextRound:
                    clients.forEach( (client,index) => {
                        client.emit('nextRound',game.getNextRoundInfo(index))
                    }) 
                    break
                case GameStatus.NextAge:
                    clients.forEach( (client,index) => {
                        client.emit('nextAge',game.getNextRoundInfo(index))
                    }) 
                    break
            }
        }

    })
    socket.on('disconnect',function(){
        var index = clients.indexOf(socket)
        clients.splice(index,1)
    })
})

