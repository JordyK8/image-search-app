const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const http = require('http').createServer(app)
var io = require('socket.io')(http)

const PORT = process.env.PORT || 3000

// Config express to handle json
app.use(express.json())


// API import
const imagesFromAPI = require('./utils/scaleserp')

// Paths for express config
const publicDirectoryPath = path.join(__dirname ,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Chat server
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  })
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  })
})




// Home route
app.get('/', (req, res) => {res.render('home', {pageTitle: 'Portfolio App'})})
//Char route
app.get('/chat', (req, res) => { res.render('chat')})
// Define routes
app.use('/imageFinder', require('./routes/imageFinder'))

http.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})
