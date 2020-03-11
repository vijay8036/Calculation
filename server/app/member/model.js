const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
   name:{
            firstname:String,
            lastname:String
       },
   contectno:Number,
   status:Number
   
},{
   timestamps: true
});

module.exports = mongoose.model('member', MemberSchema);