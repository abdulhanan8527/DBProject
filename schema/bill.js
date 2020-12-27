var mongoose = require('mongoose');
var BillSchema = new mongoose.Schema({
    billid:{
        type: Number,
        require: true,
    },
    totalbill:{
        type: Float32Array,
        require: true,
    }
});
var Bill = mongoose.model('Bill' , BillSchema);
module.exports = Bill;