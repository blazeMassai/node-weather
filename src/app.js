const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')


const app = express()

const port = process.env.PORT || 3000

const public_dir = path.join(__dirname, '../public')

const partials_dir = path.join(__dirname, '/partials')

app.disable('x-powered-by');//hide from server-side technologies like wappalyzer

// handlebars templating engine
app.set('view engine','hbs')
hbs.registerPartials(partials_dir)

app.use(express.static(public_dir))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Reward One'
    })
})


app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About App',
        name: 'Reward One'
    })
})


app.get('/hello', (req,res) => {
    res.render('hello', {
        title: 'Hello',
        name: 'Reward One'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {

    // const address = process.argv[2]

     if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

            if (error) {
                // return console.log(error)

                return res.send({
                     error
                })
            }
        
        
            // this is callback chaining, where the input fore weather comes from geocode data
            weather(latitude, longitude,(error, forecastData) => {
        
                if (error) {
                    return res.send({
                         error
                    })
                }

                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                    
                })
            })
        })
    
    // res.send({
    //     forecast: "It's sunnny",
    //     location: "Arusha",
    //     address: req.query.address
    // })
})

// Here we use the help wild card
app.get('/help/*', (req,res)=>{
    res.render('help', {
        title: 'Hello',
        name: 'Reward One'
    })
})

// the 404 route is to be placed last since node will willcheck routes sequantially 

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: 'Help',
//         name: 'Reward One'
//     })
// })



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})