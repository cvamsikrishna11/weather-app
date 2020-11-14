const request = require('postman-request');

const forcast = (lattitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bba995bfe0193ed504a7e5f35f0b45c9&query=' + lattitude + ',' + longitude + '&units=f';
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the weather service!!', undefined);
        } else if (body.error) {
            callback('API responded with an error message!', undefined);
        } else {
            callback(undefined, {
                currentWeather: body.current.weather_descriptions[0],
                actualTemperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                humidity: body.current.humidity
            })
        }

    });
}



module.exports = forcast