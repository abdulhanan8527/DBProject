const express = require('express')
const router = express.Router()
const axios = require('axios')

const {index} = require('../controllers/product')
const AuthCustomer = require('../controllers/AuthCustomer')

router.get('/registration', function(req, res, next){
    res.render('customer_reg.ejs')
})
router.get('/', function(req, res, next){
    res.render('customer.ejs')
})
router.get('/home', async (req, res, next) =>{
    const request = await axios.get('http://localhost:3000/product');
    console.log(request.data.data)
    var products = request.data.data
    var username = req.session.user.username
    var CartID = username;
    console.log("Username:",username)
    res.render('customer_home.ejs',{products,CartID})
})
//call utha whatsapp pa

//check kr ab
//set hai
// ab products show ho hena?
//class chal rahi hai
//db lab
//ok
// ok
//sun ab products or customer ki info display karwani ha customer home pa
router.get('/login', function(req, res, next){
    res.render('customer_login.ejs')
})
router.post('/registration', AuthCustomer.register)
router.post('/login', AuthCustomer.login)
module.exports = router