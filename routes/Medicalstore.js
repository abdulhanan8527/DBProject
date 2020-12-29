const express = require('express')
const router = express.Router()
const axios = require('axios')

const {index} = require('../controllers/product')
const AuthMedicalstore = require('../controllers/AuthMedicalstore')
const { json } = require('body-parser')

router.get('/registration', function(req, res , next){
    res.render('medicalstore_reg.ejs')
})
router.get('/', function(req, res , next){
    res.render('medicalstore.ejs')
})
router.get('/login', function(req, res , next){
    res.render('medicalstore_login.ejs')
})
router.get('/home',async function(req, res, next){
    const request = await axios({
        method: 'get',
        url: 'http://localhost:3000/product/mid',
        data:{
            mid: req.session.user.username
        }
    });
    const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/order/show',
        data:{
            mid: req.session.user.username
        }
    });
    //const request = await axios.get('http://localhost:3000/product/mid');
    console.log(req.session.user.username)
    console.log(response.data.response)
    var orders = response.data.response
    var products = request.data.data
    res.render('medicalstore_home.ejs',{products,orders,User: req.session.user})
})

router.post('/registration', AuthMedicalstore.register)
router.post('/login', AuthMedicalstore.login)
module.exports = router