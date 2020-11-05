const socket = io('http://localhost:3000')
const socket2 = io('http://localhost:3000/admin') //Admin namespace
socket.on('connect', () => {
    console.log(socket.id); 
})
socket.on('messageFromServer', (dataFromServer) => {
    console.log(dataFromServer);
    socket.emit('messageToServer', {data: 'This is from client'})
})
document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let newMessage = document.querySelector('#user-message').value
    if(newMessage.replace(/\s+/g, '') != ''){
    socket.emit('newMessageToServer', {text: newMessage})
    document.querySelector('#user-message').value = ''
    }
})
socket.on('messageToClient', (msg) => {
    console.log(msg);
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
})

socket2.on('connect', () => {
    console.log(socket2.id); 

})
socket2.on('welcome', (msg) => {
    console.log(msg);
})