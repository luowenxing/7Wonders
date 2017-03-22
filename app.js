    var gameport        = process.env.PORT || 4004,

        express         = require('express'),
        io              = require('socket.io'),
        
        UUID            = require('uuid'),

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
        res.sendfile( __dirname + '/client/' + file );

    }); 


    var sio = io.listen(server);


    sio.sockets.on('connection', function (client) {
        
        client.userid = UUID();

        client.emit('onconnected', { id: client.userid } );

        console.log('\t socket.io:: player ' + client.userid + ' connected');
        
        client.join('7wonders')

        sio.in('7wonders').clients(function(error, clients){
            if (error) throw error;
            console.log(clients); // => [Anw2LatarvGVVXEIAAAD]
        });


        client.on('message', function(m) {

            console.log('onmessage' + m)

        }); 

        client.on('disconnect', function () {
            console.log('ondisconnect')
        }); 
     
    }); 