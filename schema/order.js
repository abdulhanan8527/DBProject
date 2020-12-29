var mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
    oid:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    product:[
        {
            pid:{
                type: String
            },
            quantity:{
                type: Number
            },
            mid:{
                type: String,
            }
        }
    ],
    status:{
        type: String,
        default: "initiated"
    },
    address:{
        type: String
    },
    zipcode:{
        type: Number
    },
    contact:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    }
});
var Order = mongoose.model('Order' , OrderSchema);
module.exports = Order;