const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    fullName:[{
        firstName:String,
        lastName:String
    }],
    contectNo:Number,
    universityId: {
        type:String,
        ref:'university'
    },
    collageId:{
        type:String,
        ref:'collage'
    }   

}, {
    timestamps: true
}
);

module.exports = mongoose.model('Student', StudentSchema);