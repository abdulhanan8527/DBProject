const express = require('express')
const router = express.Router()
const axios = require('axios')
const CartController = require('../controllers/cart')
//const upload = require('../middleware/upload')

router.get('/',CartController.index)
router.get('/user',async (req, res) =>{
    const Cart = await axios({
        method: 'post',
        url: 'http://localhost:3000/cart/show',
        data:{
            oid: req.session.user.username
        }
    });
    console.log(Cart.data.data)
    res.render('customer_cart.ejs',{product: Cart.data.data.product})
})

router.post('/show',CartController.show)
router.post('/store', CartController.store)
router.post('/update',CartController.update)
router.post('/delete',CartController.destory)

module.exports = router