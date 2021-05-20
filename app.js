const express = require('express');
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const { Server } = require('socket.io');
const authRoutes = require('./router/authRoutes');
const cors = require('cors')
require('dotenv').config();

const port = process.env.PORT || 5000
const app = express();

//create server
const server = app.listen(port, console.log(`listening for requests on ports ${port}`));

//view engine
app.set('view engine', 'ejs')

//middle ware
app.use(cors())
app.use(express.static('public'));
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser())
app.use(authRoutes);

app.get('/', (req, res)=>{
    res.render('index')
})
// create new web socket server
const io = new Server(server);

io.on("connection", socket=>{
    console.log(`${socket.id} is online`);

    //when user comes online

    socket.on('online', client=>{
        socket.broadcast.emit('online', client)
    })
    
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
    socket.on('offline', client=>{
        socket.broadcast.emit('offline', client)
    })
    })
});



