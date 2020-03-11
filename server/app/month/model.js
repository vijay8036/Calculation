const mongoose = require('mongoose');

const MonthSchema = mongoose.Schema({
    month:String,
    year:String,
    status:Number
},{
    timestamps: true
 });

module.exports = mongoose.model('month', MonthSchema);