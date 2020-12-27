const { json } = require('body-parser')
const { response } = require('express')
const MedicalStore = require('../schema/medicalstore')

//Show the list of Orders
const index = (req, res) => {
    MedicalStore.find()
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
    MedicalStore.findOne({username: username})
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
    MedicalStore.find({username: username})
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