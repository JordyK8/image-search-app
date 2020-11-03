const request = require('postman-request')

const imagesFromScaleSerp = (query, callback) => {
    const url = `https://api.scaleserp.com/search?api_key=AD299180F4DD4BA0AA9121BB46BC205E&q=${query}&search_type=images`
    request({url, json:true}, (err, result) => {
        if(err){
            callback('Something went wrong', undefined)
        }
        callback(undefined, result)
        
    })

}

module.exports = imagesFromScaleSerp