var express = require('express');
var path = require('path');
var socket = require('socket.io');
var router = express.Router();
var app = express();
var server = require('http').Server(app);
app.use(express.static(path.resolve(__dirname,'../client')));
server.listen(8888,function() {
    console.log('server started')
})
// 创建socket服务
var sio = socket(server);
var clients = []

sio.on('connection',function(socket) {
    console.log('one client connected')
    console.log(socket)
    clients.push(socket)
    if(clients.length === 3) {
        
    }
})

