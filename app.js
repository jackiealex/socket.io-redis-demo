var express = require('express')
var app = express();
var redis = require("redis");
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use('/static', express.static('./static'))
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.use(function(socket, next) {
    console.log(socket.request.headers.cookie)
    next()
});
io.on('connection', function(socket) {
	var channel = 'chat';
    var client = createRedisClientAndSubscribe(channel, function(err, msg) {
    	console.log(err, msg, +new Date);
    	socket.emit('chat message', msg);
    });

    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        client.publish(channel, msg)
    });

    console.log('a user connected');

});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

function createRedisClientAndSubscribe(channel, callback) {
    callback || (callback = function() {})
    var client = redis.createClient();
    client.on("error", function(err) {
        console.log("Error " + err);
    });
    client.subscribe(channel, function(e) {
        console.log('subscribe:', channel);
    });
    client.on('message', callback);
    return client;
}