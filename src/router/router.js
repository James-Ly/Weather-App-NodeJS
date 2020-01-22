const express = require('express')
const router = new express.Router()
const controller = require('../controller/controller.js')

router.get('', controller.main_page)
router.post('', controller.save_city)
router.post('/delete_city/:name', controller.delete_city)

module.exports = router
