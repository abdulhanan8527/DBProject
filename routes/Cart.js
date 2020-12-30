const express = require('express')
const router = express.Router()
const axios = require('axios')
const CartController = require('../controllers/cart')
const CartSchema = require('../schema/cart')
const { response } = require('express')
//const upload = require('../middleware/upload')

router.get('/',CartController.index)
router.get('/user',async (req, res) =>{
    const cart = await axios({
        method: 'POST',
        url: 'http://localhost:3000/cart/show',
        data:{
            oid: req.session.user.username
        }
    });
    let username = req.session.user.username
    console.log(username,cart)
    res.render('customer_cart.ejs',{product: cart.data.data.product,username: req.session.user.username})
})
router.post('/removeitem', (req, res) =>{
    CartSchema.findOneAndUpdate({oid: req.body.username},
        { $pull: { product :{pid: req.body.pid} }},
        { multi: true })
        .then(response=>{
            res.json({
                message: "Item removed successfully"
            })
        })
        .catch(err => {
            res.json({
                error: "An Error Occured!"
            })
        })
})
router.post('/empty',CartController.emptyCart)
router.post('/show',CartController.show)
router.post('/store', CartController.store)
router.post('/update',CartController.update)
router.post('/delete',CartController.destory)

module.exports = router