const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})

citySchema.statics.getCityUrl = async () => {
    const cities = await City.find({})
    urlPrefix = `https://api.openweathermap.org/data/2.5/weather?q=`
    urlSurfix = `&units=metric&appid=ebe66a355c7e37e84f393b83f4d2e1a6`
    const res = []
    cities.forEach(city => {
        res.push(urlPrefix.concat(city.name, urlSurfix))
    })
    return res
}

const City = mongoose.model('City', citySchema)

module.exports = City