const path=require('path');
var http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath=path.join(__dirname,'../public');
var port = process.env.POST|| 3000;
var app=express();
var server = http.createServer(app);
var io=socketIO(server);
app.use(express.static(publicPath));

console.log(__dirname + '/../public');
console.log(publicPath);

io.on('connection',(socket)=>{
	console.log('new user is connected.');


	socket.on('createMessage',function(msg){
		console.log('createMessage', msg);

		io.emit('newMessage',{
			from:msg.from,
			text:msg.text,
			createdAt:new Date().getTime()
		});

	// 	io.emit('newMessage',{
	// 	from:msg.from,
	// 	text:msg.text,
	// 	createdAt:new Date().getTime()
	// });

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