var socket = io();

socket.on('connect',()=>{
	console.log('Conneted to the server.');

	socket.emit('createMessage',{
		from:"ratnambar gupta",
		text:"knit sultanpur"
	});


});

socket.on('newMsg',function(data){
	console.log(data);

});

socket.emit('reply',{
		"text":"got message."
	});

socket.on('newMessage',function(msg){
	console.log('New Message',msg);
});

socket.on('disconnect',()=>{
	console.log('Disconnected from the server.');
});
