const express = require('express')
const app = express()
const hbs = require('hbs')
// require('./db/mongoose.js')
const path = require('path')
const router = require('./router/router.js')
const port = process.env.PORT || 3000


// Define path for express config
const viewsPath = path.join(__dirname, '../templates/views')
const staticPath = path.join(__dirname, '../public')
// app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(staticPath))

app.use('', router)

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})