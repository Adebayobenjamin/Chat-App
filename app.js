const express = require('express');
const path = require('path');
const morgan = require('morgan')
const { Server } = require('socket.io');

const app = express();

//create server
const server = app.listen(5000, console.log("listening for requests on ports 5000"));



//middle ware
app.use(express.static('public'));

// create new web socket server
const io = new Server(server);

io.on("connection", socket=>{
    console.log(`${socket.id} is online`);
    
    // when user sends a message
    socket.on('chat', (content)=>{
        io.sockets.emit('chat', content)
    });
    
    // when user starts typing
    socket.on('is typing', handle=>{
        socket.broadcast.emit('is typing', handle)
    })

    // if user disconnects
    socket.on('disconnect', ()=>{
        console.log("a user has gone offline")
    })
});



