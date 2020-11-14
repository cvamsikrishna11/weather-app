const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forcast = require('./utils/forcast');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
// Path to load the public folder a default path
const publicDirectoryPath = path.join(__dirname, '../public');
// Path to change the defaults views named folder and to read custom folder for hbs files
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//app.com 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vamsi Chunduru'
    });
});

//app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!',
        name: 'Vamsi Chunduru'
    });
});

//app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Find help!',
        name: 'Vamsi Chunduru',
        message: 'Please write to weatherapp@vamsi.com if you have any queries or suggestions!'
    });
});

//app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address to search the weather!'
        });
    }
    console.log('Address:', req.query.address);

    geoCode(req.query.address, (error, { place, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ 'error': error });
        }
        forcast(latitude, longitude, (err, { currentWeather, actualTemperature, feelsLike } = {}) => {
            if (err) {
                return res.send({ 'error': err });
            }
            console.log('Place Response:', { place, latitude, longitude });
            console.log('Forcast Response:', { "Curent weather": currentWeather, "Actual temperature": actualTemperature, "Feels like": feelsLike });
            res.send({
                'location': place,
                'forcast': "Curent weather:" + currentWeather + " Actual temperature:" + actualTemperature + " Feels like:" + feelsLike
            })


        });

    });

});


// app.com/help/*
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vamsi Chunduru',
        errorMessage: 'Help articale not found!'
    });
});


// for the rest and error pages and this has to be in the last  
// if the all above routes are matched then its the default page to show
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vamsi Chunduru',
        errorMessage: 'Page not found!'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000.')
});
