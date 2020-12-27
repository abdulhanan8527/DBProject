const express = require('express')
const router = express.Router()
const axios = require('axios')
const Customer = require('../controllers/customer')
const Deliveryboy = require('../controllers/deliveryboy')
const MedicalStore = require('../controllers/medicalstore')

router.get('/', async (req, res) => {
    const order = await axios({
        method: 'get',
        url: 'http://localhost:3000/order'
    });
    const customers = await axios({
        method: 'get',
        url: 'http://localhost:3000/admin/customer'
    });
    const medicalstore = await axios({
        method: 'get',
        url: 'http://localhost:3000/admin/medicalstore'
    });
    const deliveryboy = await axios({
        method: 'get',
        url: 'http://localhost:3000/admin/deliveryboy'
    });
    console.log("ORDER: ", order.data.data)
    console.log("CUSTOMER: ",customers.data.response)
    console.log("MEDICAL STORES",medicalstore.data.response)
    console.log("DELIVERY BOY: ",deliveryboy.data.response)
    res.render('admin.ejs',{
        customer: customers.data.response,
        medicalstore: medicalstore.data.response,
        deliveryboy: deliveryboy.data.response,
        order: order.data.data
    })
})

router.get('/customer',Customer.index)
router.get('/deliveryboy',Deliveryboy.index)
router.get('/medicalstore',MedicalStore.index)

module.exports = router