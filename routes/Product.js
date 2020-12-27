const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product')
//const upload = require('../middleware/upload')

router.get('/',ProductController.index)
router.get('/mid',ProductController.getProducts)
router.post('/show',ProductController.show)
router.post('/store', ProductController.store)
router.post('/update',ProductController.update)
router.post('/delete',ProductController.destory)

module.exports = router