var mongoose = require('mongoose');
var CartSchema = new mongoose.Schema({
    oid:{
        type: String,
        require: true,
        unique: true,
    },
    product:[
        {
            pid:{
                type: String,
            },
            mid:{
                type: String,
            },
            price: {
                type: Number,
            },
            quantity:{
                type: Number,
                default: 0
            }
        }
    ]
    
});
var Cart = mongoose.model('Cart' , CartSchema);
module.exports = Cart;