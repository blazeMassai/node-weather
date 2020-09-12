const request = require('postman-request')


const weather = (latitude, longitude ,callback) => {
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamF5YmxhemUiLCJhIjoiY2tiNTh5NG10MG5qNjJ6bzI4NnFoMTJyOCJ9.ibXBk5ClGd97DvjJk9qnIA'

    const url = 'http://api.weatherstack.com/current?access_key=68bf45dbbafd6553f0e77f693e5295f0&query=' + latitude + ',' + longitude + '&units=m'

    request ({url, json:true}, (error, {body}) => {
    console.log('--------------------------------------------------')

    if  (error) {
       callback('Unable to connect to Weather Services', undefined)
    } else if (body.error) {
        callback('Unable to find location, try another search', undefined)
    } else {
     
        
        callback(undefined, {
            
            weather: body.current.weather_descriptions[0],
            temperature: body.current.temperature,
            location: body.location.name,
            looks_like: body.current.feelslike
        })
    }
    
})
}

module.exports = weather