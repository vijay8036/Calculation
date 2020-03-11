const mongoose = require('mongoose');

const UniversitySchema = mongoose.Schema({
    name: String,
    password:String
});

module.exports = mongoose.model('university', UniversitySchema);