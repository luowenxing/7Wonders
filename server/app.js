var express = require('express');
var path = require('path');
var socket = require('socket.io');
var router = express.Router();
var app = express();
var server = require('http').Server(app);
var Game = require('./game.js')
var { GameStatus } = require('./util/consts.js')
app.use(express.static(path.resolve(__dirname,'../client')));
server.listen(8888,function() {
    console.log('server started')
})
// 创建socket服务
var sio = socket(server);
var clients = []
var game

sio.on('connection',function(socket) {
    clients.push(socket)
    socket.index = clients.length
    if(clients.length === 3) {
        game = new Game({
            playersCount:clients.length
        })
        clients.forEach( (client,index) => {
            client.emit('newGame',game.getNextRoundInfo(index))
        }) 
    }

    socket.on('choose',function(choice){
        // 是否所有人选择完毕，进入下一轮
        switch(game.status) {
            case GameStatus.nextRound:
                clients.forEach( (client,index) => {
                    client.emit('nextRound',game.getNextRoundInfo(index))
                }) 
                break
            case GameStatus.WaitForChoice:
                var result = game.shouldChoose(socket.index,choice)
                socket.emit('chooseResult',result)
                break
        }

    })
})

