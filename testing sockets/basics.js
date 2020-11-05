const http = require('http')
const socketio = require('socket.io')

const server = http.createServer((req,res) => {
    res.end('created')
})

const io = socketio(server)

io.on('connect', (socket) => {
    socket.emit('welcome', 'Welcome to the socket server')
    socket.on('message', (msg) => {
        console.log(msg);
    })
})


server.listen(3000)