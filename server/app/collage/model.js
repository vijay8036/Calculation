const mongoose = require('mongoose');

const CollageSchema = mongoose.Schema({
    name: String,
    universityId: {
        type: String,
        ref: 'university'
    }
});

module.exports = mongoose.model('collage', CollageSchema);