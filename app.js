    var gameport        = process.env.PORT || 4004,

        io              = require('socket.io'),
        express         = require('express'),
        UUID            = require('node-uuid'),

        verbose         = false,
        http            = require('http'),
        app             = express(),
        server          = http.createServer(app);


    server.listen(gameport)

    console.log('\t :: Express :: Listening on port ' + gameport );

    app.get( '/', function( req, res ){
        console.log('trying to load %s', __dirname + '/index.html');
        res.sendfile( '/client/index.html' , { root:__dirname });
    });

    app.get( '/client/*' , function( req, res, next ) {
        var file = req.params[0];
        if(verbose) console.log('\t :: Express :: file requested : ' + file);
        res.sendfile( __dirname + '/' + file );

    }); 


    var sio = io.listen(server);


    sio.configure(function (){

        sio.set('log level', 0);

        sio.set('authorization', function (handshakeData, callback) {
          callback(null, true); // error first callback style
        });

    });


    sio.sockets.on('connection', function (client) {
        
        client.userid = UUID();

        client.emit('onconnected', { id: client.userid } );

        console.log('\t socket.io:: player ' + client.userid + ' connected');
        

        client.on('message', function(m) {

            console.log('onmessage' + m)

        }); 

        client.on('disconnect', function () {
            console.log('ondisconnect')
        }); 
     
    }); 