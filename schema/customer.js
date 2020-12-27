var mongoose = require('mongoose');
var CustomerSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
    },
    reg_date:{
        type: Date,
        required: true,
        default: Date.now,
    }
},{timestamps: true});
var Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;