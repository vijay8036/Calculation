const Collage = require('./model.js');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const collageModel = mongoose.model('collage');
// Create and Save a new collage
exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if(!req.body.name && !req.body.universityId) {
        console.log
        return res.status(400).send({
            message: "Collage content can not be empty"
        });
    }

    // Create a collage
    const collage = new Collage({
        name: req.body.name || "Untitled collage",
        universityId:req.body.universityId
       
    });

    // Save collage in the database
    collage.save()
        .then(data => {
            collageModel.findOne({ _id: ObjectId(data._id) })
                .populate("universityId")
                .exec(function (err, data) {
                    res.send(data);
                });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the collage."
            });
        });
};

// Retrieve and return all collages from the database.
exports.findAll = (req, res) => {
    Collage.find()
    .populate('universityId') /// ref data id
    .then(collages => {
        res.send(collages);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving collages."
        });
    });
};

// Find a single collage with a collageId
exports.findOne = (req, res) => {
    Collage.findById(req.params.collageId)
    .populate("universityId")
    .then(collage => {
        if(!collage) {
            return res.status(404).send({
                message: "collage not found with id " + req.params.collageId
            });            
        }        
        res.send(collage);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "collage not found with id " + req.params.collageId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving collage with id " + req.params.collageId
        });
    });
};
exports.findUniversityById = (req, res) => {
    Collage.find({ universityId: req.params.universityId } )
    .populate("universityId")
    .then(collage => {
       if(!collage) {
            return res.status(404).send({
                message: "collage not found with id " + req.params.collageId
            });            
        }        
        res.send(collage);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "collage not found with id " + req.params.collageId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving collage with id " + req.params.collageId
        });
    });
};

// Update a collage identified by the collageId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "collage name can not be empty"
        });
    }

    // Find collage and update it with the request body
    Collage.findByIdAndUpdate(req.params.collageId, {
        name: req.body.name || "Unnamed collage",
        universityId: req.body.universityId
    }, {new: true})
    .then(collage => {
        if(!collage) {
            return res.status(404).send({
                message: "collage not found with id " + req.params.collageId
            });
        }
        collageModel.findOne({ _id: ObjectId(collage._id) })
            .populate("universityId")
            .exec(function (err, data) {
                res.send(data);
        });
        // res.send(collage);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "collage not found with id " + req.params.collageId
            });                
        }
        return res.status(500).send({
            message: "Error updating collage with id " + req.params.collageId
        });
    });
};

// Delete a collage with the specified collageId in the request
exports.delete = (req, res) => {
    Collage.findByIdAndRemove(req.params.collageId)
    .then(collage => {
        if(!collage) {
            return res.status(404).send({
                message: "collage not found with id " + req.params.collageId
            });
        }
        res.send({message: "collage deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "collage not found with id " + req.params.collageId
            });                
        }
        return res.status(500).send({
            message: "Could not delete collage with id " + req.params.collageId
        });
    });
};
