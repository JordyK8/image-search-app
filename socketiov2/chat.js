const express = require('express')
const app = express()
const socketio = require('socket.io')


app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(3000)
const io = socketio(expressServer)

io.on('connection', (socket) => {
    socket.emit('messageFromServer', {data: 'Welcome to socketio server'})
    socket.on('messageToServer', (dataFromClient) => {
        console.log(dataFromClient);
    })
    socket.join('level1')
    io.of('/').to('level1').emit('joined', `${socket.id} joined level 1 room`)
})

//Admin namespace
io.of('/admin').on('connection', (socket) => {
    console.log('Someone connected to admin namescpace');
    io.of('/admin').emit('welcome', 'Welcome to admiN!')
})