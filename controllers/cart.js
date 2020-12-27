const { json } = require('body-parser')
const { response } = require('express')
const Cart = require('../schema/cart')

//Show the list of Products
const index = (req, res) => {
    Cart.find()
    .then(response => {
        res.json({
            data: response
        })
    })
    .catch(error => {
        res.json({
            data: error
        })
    })
}
//show Cart using ID
const show = (req, res) => {
    let CartID = req.body.oid
    Cart.findOne({oid: CartID})
    .then(response => {
        res.json({
            data: response
        })
    })
    .catch(error => {
        res.json({
            message: "An Error Occured"
        })
    })
}
//add new Cart
const store = (req, res) => {
    let cart = new Cart({
        oid: req.body.oid,
        product: { pid: '',price:0, mid:'', quantity: ''},
    })
    cart.save()
    .then(response => {
        res.json({
            data: response
        })
    })
    .catch(error => {
        res.json({
            err: error
        })
    })
}
//update an Cart
const update = (req, res) => {
    let CartID = req.body.oid
    var id = req.body.pid
    var price = req.body.price
    var quan = req.body.quantity
    var mid = req.body.mid
    console.log(CartID)
    console.log(id, quan)
    Cart.findOneAndUpdate({oid: CartID}, {
        $push: {
            product: {
                pid: id,
                mid: mid,
                price: price,
                quantity: quan
            }
        }
    },
    {useFindAndModify: false})
    .then((cart) => {
        res.json({
            message: 'Cart Updated Successfully'
        })
    })
    .catch(error => {
        res.json({
           Err: error
        })
        console.log(error)
    })
}
//delete an Cart
const destory = (req, res) => {
    let CartID = req.body.oid
    Cart.findByIdAndRemove(CartID)
    .then(() => {
        res.json({
            message: 'Cart Deleted Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured'
        })
    })
}
//exporting functions
module.exports = {
    index, show, store, update, destory
}