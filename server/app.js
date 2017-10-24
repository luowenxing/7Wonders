let express = require('express');
let path = require('path');
let socket = require('socket.io');
let router = express.Router();
let app = express();
let server = require('http').Server(app);
let Game = require('./game.js')
let { GameStatus,IOEvent } = require('./util/consts.js')
app.use(express.static(path.resolve(__dirname,'../client')));
server.listen(8888,function() {
    console.log('server started')
})
// 创建socket服务
let sio = socket(server);
let clients = []
let game

sio.on('connection',function(socket) {
    if(clients.filter( x => socket.request.headers.cookie === x.request.headers.cookie ).length == 0) {
        socket.index = clients.length
        clients.push(socket)
        console.log('player in ' + socket.request.headers.cookie)
    }
    if(clients.length === 3) {
        console.log('new game')
        game = new Game({
            playersCount:clients.length
        })
        clients.forEach( (client,index) => {
            client.emit(IOEvent.Update,game.getGameInfo(index))
        }) 
    }

    socket.on(IOEvent.Choose,function(choice){
        let result = game.shouldChoose(socket.index,choice)
        // 返回选择结果
        socket.emit(IOEvent.Choose,result)
        // 是否广播进入下一轮
        if(game.shouldNextRound(socket.index)) {
            clients.forEach( (client,index) => {
                client.emit(IOEvent.Update,game.getGameInfo(index))
            }) 
        }
    })
    socket.on('disconnect',function(){
        var index = clients.indexOf(socket)
        clients.splice(index,1)
    })
})

