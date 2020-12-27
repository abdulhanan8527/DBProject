const { json } = require('body-parser')
const { response } = require('express')
const Product = require('../schema/product')

//Show the list of Products
const index = (req, res) => {
    Product.find()
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
const getProducts = (req, res) => {
    let ProductID = req.body.mid
    Product.find({mid: ProductID})
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
//show Product using ID
const show = (req, res) => {
    let ProductID = req.body.pid
    Product.findById(ProductID)
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
//add new Product
const store = (req, res) => {
    let product = new Product({
        pid: req.body.pid,
        pname: req.body.pname,
        mid: req.session.user.username,
        price: req.body.price,
        quantity: req.body.quantity
    })
    product.save()
    .then(response => {
        res.json({
            message: 'Product Added Successfully'
        })
    })
    .catch(error => {
        res.json({
            err: error
        })
    })
}
//update an Product
const update = (req, res) => {
    let ProductID = req.body.pid

    let updatedData = {
        pid: req.body.pid,
        pname: req.body.pname,
        price: req.body.price,
        quantity: req.body.quantity
    }

    Product.findByIdAndUpdate(ProductID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Product Updated Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured'
        })
    })
}
//delete an Product
const destory = (req, res) => {
    let ProductID = req.body.pid
    Product.findByIdAndRemove(ProductID)
    .then(() => {
        res.json({
            message: 'Product Deleted Successfully'
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
    index, show, store, update, destory, getProducts
}