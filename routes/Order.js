const express = require('express')
const router = express.Router()
const axios = require('axios')
const OrderController = require('../controllers/order')
//const upload = require('../middleware/upload')

router.get('/',OrderController.index)
router.get('/user', async (req, res)=>{
    const Cart = await axios({
        method: 'post',
        url: 'http://localhost:3000/cart/show',
        data:{
            oid: req.session.user.username
        }
    });
    console.log('CART: ',Cart.data.data)
    var user = req.session.user
    res.render('customer_order.ejs',{User: user,product: Cart.data.data.product})
})
router.post('/show',OrderController.show)
router.post('/store', OrderController.store, async(req, res)=>{
    const Cart = await axios({
        method: 'post',
        url: 'http://localhost:3000/cart/empty',
        data:{
            oid: req.session.user.username
        }
    });
    console.log(Cart)
})
router.post('/update',OrderController.update)
router.post('/updatedeliveryboy',OrderController.updateDeliveryboy)
router.post('/delete',OrderController.destory)

module.exports = router