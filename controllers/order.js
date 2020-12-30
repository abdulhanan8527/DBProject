const { json } = require('body-parser')
const { response } = require('express')
const Order = require('../schema/order')
const axios = require('axios')

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
const store = async (req, res, next) => {
    console.log(JSON.parse(req.body.product))
    let p = JSON.parse(req.body.product)
    for(var i=1;i<p.length;i++){
        const product = await axios({
            method: 'post',
            url: 'http://localhost:3000/product/show',
            data:{
                pid: p[i].pid
            }
        });
        let quan = product.data.response.quantity - p[i].quantity
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/product/update',
            data:{
                pid: p[i].pid, 
                quantity: quan
            }
        });
        console.log(response.data)
    }
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
    next()
}
//update an Order
const update = async (req, res) => {
    let OrderID = req.body.oid

    let updatedData = {
        status: req.body.status
    }

    if(updatedData.status == 'cancelled'){
        let p = JSON.parse(req.body.product)
        for(var i=1;i<p.length;i++){
            const product = await axios({
                method: 'post',
                url: 'http://localhost:3000/product/show',
                data:{
                    pid: p[i].pid
                }
            });
            let quan = product.data.response.quantity + p[i].quantity
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/product/update',
                data:{
                    pid: p[i].pid, 
                    quantity: quan
                }
            });
            console.log(response.data)
        }
    }

    Order.findOneAndUpdate({oid: OrderID}, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Order Updated Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: error
        })
    })
}
const updateDeliveryboy = (req, res) => {
    let OrderID = req.body.oid

    let updatedData = {
        status: req.body.status,
        deliveryboy: req.body.deliveryboy
    }

    Order.findOneAndUpdate({oid: OrderID}, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Order Updated Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: error
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
    index, show, store, update, destory, getOrders, updateDeliveryboy
}