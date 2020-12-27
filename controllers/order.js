const { json } = require('body-parser')
const { response } = require('express')
const Order = require('../schema/order')

//Show the list of Orders
const index = (req, res) => {
    Order.find()
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
const getOrders = (req, res) => {
    let OrderID = req.body.oid
    Order.find({oid: OrderID})
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
//show Order using ID
const show = (req, res) => {
    let OrderID = req.body.mid
    Order.find({product: {$elemMatch:{mid: OrderID}}})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: "An Error Occured"
        })
    })
}
//add new Order
const store = (req, res) => {
    console.log(JSON.parse(req.body.product))
    let order = new Order({
        oid: req.body.oid,
        username: req.body.username,
        product: JSON.parse(req.body.product),
        address: req.body.address,
        zipcode: parseInt(req.body.zipcode),
        contact: req.body.contact
    })
    order.save()
    .then(response => {
        res.json({
            message: 'Order Added Successfully'
        })
    })
    .catch(error => {
        res.json({
            err: error
        })
    })
}
//update an Order
const update = (req, res) => {
    let OrderID = req.body.oid

    let updatedData = {
        status: req.body.status
    }

    Order.findByIdAndUpdate(OrderID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Order Updated Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured'
        })
    })
}
//delete an Order
const destory = (req, res) => {
    let OrderID = req.body.oid
    Order.findAndRemove({oid: OrderID})
    .then(() => {
        res.json({
            message: 'Order Deleted Successfully'
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
    index, show, store, update, destory, getOrders
}