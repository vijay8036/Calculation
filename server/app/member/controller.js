const Member = require('./model.js');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const memberModel = mongoose.model('member');
// Create and Save a new collage
exports.create = (req, res) => {
    console.log(req.body)
   
    // Create a collage
    const member = new Member({       
        name:{
            firstname:req.body.name.firstname || "Untitled first Name",
            lastname:req.body.name.lastname || "Untitled Last Name"
       },
        contectno:req.body.contectno,
        status:req.body.status || 0
       
    });

    // Save member in the database
    member.save()
        .then(data => {           
            res.send(data);               
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the collage."
            });
        });
};

// Retrieve and return all collages from the database.
exports.findAll = (req, res) => {
    Member.find().sort({"_id":-1})   
    .then(member => {
        res.send(member);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving member."
        });
    });
};


// Find a single collage with a collageId
exports.findOne = (req, res) => {
    Member.findById(req.params.memberId)    
    .then(member => {
        if(!member) {
            return res.status(404).send({
                message: "member not found with id " + req.params.memberId
            });            
        }        
        res.send(member);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "member not found with id " + req.params.memberId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving member with id " + req.params.memberId
        });
    });
};


// Update a member identified by the memberId in the request
exports.update = (req, res) => {
   

    // Find member and update it with the request body
    Member.findByIdAndUpdate(req.params.memberId, {
        name:{
            firstname:req.body.name.firstname ,
            lastname:req.body.name.lastname
       },
        contectno:req.body.contectno        
    }, {new: true})
    .then(member => {
        if(!member) {
            return res.status(404).send({
                message: "member not found with id " + req.params.memberId
            });
        }
        res.send(member);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "member not found with id " + req.params.memberId
            });                
        }
        return res.status(500).send({
            message: "Error updating member with id " + req.params.memberId
        });
    });
};

// Delete a member with the specified memberId in the request
exports.delete = (req, res) => {
    Member.findByIdAndRemove(req.params.memberId)
    .then(member => {
        if(!member) {
            return res.status(404).send({
                message: "member not found with id " + req.params.memberId
            });
        }
        res.send({message: "member deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "member not found with id " + req.params.memberId
            });                
        }
        return res.status(500).send({
            message: "Could not delete member with id " + req.params.memberId
        });
    });
};
