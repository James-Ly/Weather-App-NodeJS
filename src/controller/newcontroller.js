const cities = require('../utils/cities.js')
const Promise = require('promise')
const fetch = require('node-fetch')

// Render the main page of this app
module.exports.main_page = async (req, res) => {
    const urls = await cities.getCityUrl()
    if (urls.length == 0) {
        res.render('index.hbs')
    } else {
        Promise.all(urls.map(url => fetch(url)))
            .then(resp => Promise.all(resp.map(r => r.text())))
            .then(result => {
                let cities = []
                result.forEach(element => {
                    const temp = JSON.parse(element)
                    const city = {
                        'city': temp.name,
                        'temperature': temp.main.temp,
                        'description': temp.weather[0].description,
                        'icon': temp.weather[0].icon
                    }
                    cities.push(city)
                })
                res.render('index.hbs', { cities: cities })
            })
            .catch(error => {
                res.send(error)
            })
    }
}

module.exports.delete_city = async (req, res) => {
    try {
        const cityname = req.params.name
        cities.getCity(cityname)
            .then(element => {
                cities.removeCity(element.id)
            })
            .then(res.redirect('/'))
            .catch(error => {
                console.log(error)
            })
    }
    catch (error) {
        res.status(400).send(error)
    }
}

module.exports.save_city = async (req, res) => {
    try {
        cityname = req.body.name
        urlPrefix = `https://api.openweathermap.org/data/2.5/weather?q=`
        urlSurfix = `&units=metric&appid=ebe66a355c7e37e84f393b83f4d2e1a6`
        fetch(urlPrefix.concat(cityname, urlSurfix))
            .then(res => res.text())
            .then(async (res) => {
                const temp = JSON.parse(res)
                const newcity = {
                    name: temp.name,
                    id: temp.id
                }
                cities.addCity(newcity)
            })
            .catch(error => {
                console.log('Error', error)
            })
            .finally(() => {
                res.redirect('/')
            })
    }
    catch (error) {
        res.status(400).send('Error', error)
    }
}