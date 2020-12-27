const { json } = require('body-parser')
const { response } = require('express')
const Customer = require('../schema/customer')

//Show the list of Orders
const index = (req, res) => {
    Customer.find()
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
    Customer.findOne({username: username})
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
    Customer.find({username: username})
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