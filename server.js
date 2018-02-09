var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(server); 
var path = require('path');
var clients = {};
var users  = [];
var connections = [];
app.use('/public', express.static(path.join(__dirname + '/public')));
app.get('/index.html',function(req,res){
    res.sendFile(path.join(__dirname,'/index.html'));
})
io.sockets.on('connection',function(socket){
    connections.push(socket);
    clients[socket.id] = socket;
    console.log('User Connected',connections.length);
    socket.on('disconnect',function(data){
        delete clients[socket.id];
        console.log(data);
        //users.splice(users.indexOf(socket.username),1);
        updateUserNames(); 
        connections.splice(connections.indexOf(socket),1);
        console.log("Disconnected: %s Socket/s connected", connections.length);
    })
    socket.on('send-message',function(dataMsg){
        io.sockets.emit('new message',{msg: dataMsg, user: socket.username});
        console.log("data coming from"+socket.username , dataMsg)
    })
    socket.on('new-user', function(newUsr, callback){
        socket.username = newUsr;
        console.log(socket.username);
        users.push(socket.username);
        updateUserNames();
    });
    function updateUserNames(){
        console.log(users);
        io.sockets.emit('get-user',users);
    }
})
server.listen(process.env.port || port,function(){
    console.log("Server is Listening on Port", port);
})
