(function() {
    var socket = io.connect('http://localhost');
    socket.on('onconnected', function (data) {
        console.log(data);
        socket.emit('message', { my: 'data' });
    });
})()

