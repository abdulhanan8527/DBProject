const { json } = require('body-parser')
const { response } = require('express')
const Deliveryboy = require('../schema/deliveryboy')

//Show the list of Orders
const index = (req, res) => {
    Deliveryboy.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            error
        })
    })
}
//show Order using ID
const show = (req, res) => {
    let username = req.body.username
    Deliveryboy.findOne({username: username})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            error
        })
    })
}
//delete an Order
const destory = (req, res) => {
    let username = req.body.username
    Deliveryboy.find({username: username})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            error
        })
    })
}
module.exports = {
    index, show, destory
}