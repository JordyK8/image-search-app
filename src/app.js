const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

// Config express to handle json
app.use(express.json())


// API import
const imagesFromAPI = require('./utils/scaleserp')

// Paths for express config
const publicDirectoryPath = path.join(__dirname ,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

// Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// Routes
app.get('/', (req, res) => {
  const query = req.query.q
  console.log(query);
    imagesFromAPI(query,(err, data) => {
      if(err){
        return console.log(err);
      }
      const imageSrc = data.body.image_results
      res.render('home', {
        imageSrc
      })
    })
})

app.listen(3000, () => {
    console.log('Server started');
})