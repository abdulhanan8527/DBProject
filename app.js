if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const port = 3000
const CustomerRouter = require('./routes/Customer')
const DeliveryBoyRouter = require('./routes/Deliveryboy')
const MedicalStoreRouter = require('./routes/Medicalstore')
const ProductRouter = require('./routes/Product')
const CartRouter = require('./routes/Cart')
const OrderRouter = require('./routes/Order')
const AdminRouter = require('./routes/admin')
const express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')

const mongoose = require('mongoose')
const morgan = require('morgan')
const url = "mongodb://sajiidx:sajiidx@cluster0-shard-00-00.u2ccs.mongodb.net:27017,cluster0-shard-00-01.u2ccs.mongodb.net:27017,cluster0-shard-00-02.u2ccs.mongodb.net:27017/hanan?ssl=true&replicaSet=atlas-4durab-shard-0&authSource=admin&retryWrites=true&w=majority" //ab seda monogodb py ja k save hoga 
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true ,  useCreateIndex: true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () =>{
    console.log('Database Connection Established!')
})
//ab kya krna hai??
const users = []

app.use(express.json())
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(express.static(__dirname + '/public'))

app.get('/welcome', function(req, res){
    res.render('welcome.ejs')
})

app.listen(port);

console.log('Now the server is running on url: https://127.0.0.1:3000')

app.use('/customer',CustomerRouter);
app.use('/deliveryboy',DeliveryBoyRouter);
app.use('/medicalstore',MedicalStoreRouter);
app.use('/cart',CartRouter);
app.use('/product',ProductRouter);
app.use('/order',OrderRouter);
app.use('/admin',AdminRouter);