const mongoose = require('mongoose');

const TransitionSchema = mongoose.Schema({   
    memberId: {
        type:String,
        ref: 'member'
    },
    monthId: {
        type:String,
        ref: 'month'
    },
    installmentAmount:Number,
    newWidthdrowal:Number,
    widthdrowalCredit:Number,
    intrest:Number,
    fine:Number,     
},{
    timestamps: true
 });
//  transitionModel.createIndex( { "$**": "text" } )({'$**': 'text'});

module.exports = mongoose.model('transition', TransitionSchema);