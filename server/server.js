const path=require('path');
var http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath=path.join(__dirname,'../public');
var port = process.env.PORT|| 3000;
var app=express();
var server = http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));

console.log(__dirname + '/../public');
console.log(publicPath);

io.on('connection',(socket)=>{
	console.log('new user is connected.');


	socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app.'));


	socket.broadcast.emit('newMessage',generateMessage('Admin','New user has joined.'));


	socket.on('createMessage',(message)=>{
		io.emit('newMessage',generateMessage(message.from,message.text));
	});


	  

	socket.emit('newMsg',{
		"from":"ratnambar",
		"text":"hello everyone."

	});



	socket.on('reply', function(data){
		console.log(data);
	});
	

socket.on('disconnect',()=>{
	console.log('Disconnected from the server.');
});
});

server.listen(port,()=>{
	console.log(`Server is listening at ${port}.`);
});