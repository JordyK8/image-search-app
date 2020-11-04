const express = require('express')

const router = express.Router()
//API import
const imagesFromAPI = require('../utils/scaleserp')

// Home routes
router.get('/', (req, res) => {
  const query = req.query.q
  console.log(query);
    imagesFromAPI(query,(err, data) => {
      if(err){
        return console.log(err);
      }
      const imageSrc = data.body.image_results
      res.render('imageFinder', {
          pageTitle: 'Image Finder App',
        imageSrc
      })
    })
})
module.exports = router