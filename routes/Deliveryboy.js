const express = require('express')
const router = express.Router()
const axios = require('axios')

const AuthDeliveryboy = require('../controllers/AuthDeliveryboy')

router.get('/registration', function(req, res, next){
    res.render('deliveryboy_reg.ejs')
})
router.get('/', function(req, res, next){
    res.render('deliveryboy.ejs')
})
router.get('/home', async function(req, res, next){
    const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/order'
    });
    console.log(response.data.data)
    var orders = response.data.data
    res.render('deliveryboy_home.ejs',{orders})
})
router.get('/login', function(req, res, next){
    res.render('deliveryboy_login.ejs')
})
router.post('/registration', AuthDeliveryboy.register)
router.post('/login', AuthDeliveryboy.login)

module.exports = router