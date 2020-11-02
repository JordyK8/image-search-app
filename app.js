const express = require('express')
const app = express()
const path = require('path')
const axios = require('axios');

const publicDirectoryPath = path.join(__dirname ,'../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.set('view engine', 'hbs')



// set up the request parameters
const params = {
  api_key: "AD299180F4DD4BA0AA9121BB46BC205E",
  q: "nodejs",
  search_type: "images"
}



app.get('/', (req, res) => {
    
// make the http GET request to Scale SERP
axios.get('https://api.scaleserp.com/search', { params })
  .then(response => {

    // print the JSON response from Scale SERP
    
    res.render('home', {
        imageSrc: response.data.image_results[0].image
    })

  }).catch(error => {
    // catch and print the error
    console.log(error);
  })
    
    
})

app.listen(3000, () => {
    console.log('Server started');
})