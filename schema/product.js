var mongoose = require("mongoose");
var ProductSchema = new mongoose.Schema({
    pname:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    pid:{
        type: String,
        required: true,
        unique: true,
    },
    mid:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
    }
});
var Product = mongoose.model('Product' , ProductSchema);
module.exports = Product;
