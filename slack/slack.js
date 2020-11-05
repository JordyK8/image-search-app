const express = require('express')
const app = express()
const socketio = require('socket.io')

let namespaces = require('./data/namespaces')
console.log(namespaces);

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(3000)

const io = socketio(expressServer)


io.on('connection', (socket) => {
    socket.emit('messageFromServer', {data: 'Message from Server'})
    socket.on('messageToServer', (dataFromClient) => {
        console.log(dataFromClient);
    })
    socket.on('newMessageToServer', (msg) => {
        io.emit('messageToClient', {text: msg.text})
    })
})

//Admin namespace
io.of('/admin').on('connection', (socket) => {
    console.log('Someone connected to admin namescpace');
    io.of('/admin').emit('welcome', 'Welcome to admiN!')
})