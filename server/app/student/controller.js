const Student = require('./model.js');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const studenteModel = mongoose.model('Student');

// Create and Save a new Student
exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if(!req.body.fullName) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Create a student
    const student = new Student({        
        fullName:req.body.fullName,
        contectNo:req.body.contectNo,
        universityId:req.body.universityId,
        collageId:req.body.collageId       
    });

    // Save student in the database
    student.save()
    .then(data => {
        studenteModel.findOne({ _id: ObjectId(data._id) })
        .populate("universityId")
        .populate('collageId')
        .exec(function (err, data) {
            res.send(data);
        });
      
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the student."
        });
    });
};

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
    Student.find().sort("-createdAt")
    .populate('universityId')
    .populate('collageId')
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving students."
        });
    });
};

// Find a single student with a studentId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving student with id " + req.params.studentId
        });
    });
};

// Update a student identified by the studentId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.fullName) {
        return res.status(400).send({
            message: "student fullName can not be empty"
        });
    }

    // Find student and update it with the request body
    Student.findByIdAndUpdate(req.params.studentId, {
        fullName:req.body.fullName,
        contectNo:req.body.contectNo,
        universityId:req.body.universityId,
        collageId:req.body.collageId    
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });
        }
      
        studenteModel.findOne({ _id: ObjectId(student._id) })
            .populate("universityId")
            .populate('collageId')
            .exec(function (err, data) {

                res.send(data);
        });
       
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error updating student with id " + req.params.studentId
        });
    });
};

// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });
        }
        res.send({message: "student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.studentId
        });
    });
};
