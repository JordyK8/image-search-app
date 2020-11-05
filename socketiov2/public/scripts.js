const socket = io('http://localhost:3000')
const socket2 = io('http://localhost:3000/admin') //Admin namespace

socket.on('messageFromServer', (dataFromServer) => {
    console.log(dataFromServer);
    socket.emit('messageToServer', {data: 'This is from client'})
})

socket.on('joined', (msg) => {
    console.log(msg);
})

socket2.on('welcome', (dataFromServer) => {
    console.log(dataFromServer);
})
document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let newMessage = document.querySelector('#user-message').value
    if(newMessage.replace(/\s+/g, '') != ''){
    socket.emit('newMessageToServer', {text: newMessage})
    document.querySelector('#user-message').value = ''
    }
})

