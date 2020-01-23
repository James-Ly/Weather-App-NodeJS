const cities = []

const addCity = ({ id, name }) => {
    return new Promise((resolve, reject) => {
        name = name.trim()
        //Validate the data
        if (!name) {
            reject({
                error: 'City not found'
            })
        }

        //Check for existing city
        const existingCity = cities.find((city) => {
            return city.name === name
        })

        if (existingCity) {
            reject({
                error: 'City already exists'
            })
        }
        const newcity = {
            name: name,
            id: id
        }
        cities.push(newcity)
        resolve(newcity)
    })
}

const removeCity = (id) => {
    return new Promise((resolve, reject) => {
        const index = cities.findIndex((city) => {
            return city.id === id
        })
        if (index !== -1) {
            resolve(cities.splice(index, 1)[0])
        } else {
            reject({
                error: 'Could not find the city'
            })
        }
    })
}

const getCity = (name) => {
    return new Promise((resolve, reject) => {
        resolve(cities.find((city) => {
            return city.name === name
        }))
    })

}

const getCityUrl = () => {
    return new Promise((resolve, reject) => {
        urlPrefix = `https://api.openweathermap.org/data/2.5/weather?q=`
        urlSurfix = `&units=metric&appid=ebe66a355c7e37e84f393b83f4d2e1a6`
        const res = []
        cities.forEach(city => {
            res.push(urlPrefix.concat(city.name, urlSurfix))
        })
        resolve(res)
    })

}

module.exports = {
    addCity,
    removeCity,
    getCity,
    getCityUrl,
}