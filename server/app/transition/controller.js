const Transition = require('./model.js');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const transitionModel = mongoose.model('transition');
// Create and Save a new collage
exports.create = (req, res) => {
    console.log(req.body)    
    // Save University in the database
    transitionModel.insertMany(req.body)
    .then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the university."
        });
    });   
};


// Retrieve and return all collages from the database.
exports.totalTransitionDetails = (req, res) => { 
    
    transitionModel.aggregate([           
            {
                "$group": {
                    "_id": "all",
                    "totalinstallmentAmount": {"$sum":"$installmentAmount"},
                    "totalwidthdrowal": { "$sum": "$newWidthdrowal"},
                    "totalwidthdrowalCredit": { "$sum": "$widthdrowalCredit"},
                    "totalintrest": { "$sum": "$intrest"},
                    "totalfine": { "$sum": "$fine"},                
                }
        }
    ])
    .then(transition => {
        res.send(transition)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving transition."
        });
    });
};
// Retrieve and return all collages from the database.
exports.memberDetails = (req, res) => { 
    
    transitionModel.aggregate([           
            {
                "$group": {
                    "_id": "$memberId",
                    "memberinstallmentAmount": {"$sum":"$installmentAmount"},
                    "memberwidthdrowal": { "$sum": "$newWidthdrowal"},
                    "memberwidthdrowalCredit": { "$sum": "$widthdrowalCredit"},
                    "memberintrest": { "$sum": "$intrest"},
                    "memberfine": { "$sum": "$fine"},                
                }
        }
    ])
    .then(transition => {
        res.send(transition)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving transition."
        });
    });
};
// Retrieve and return all collages from the database.
exports.findAll = (req, res) => {
    var regex = new RegExp(2000, 'i');  // 'i' makes it case insensitive
    Transition.find({text: regex}).sort({"_id":-1})   
    .populate('memberId')
    .populate('monthId')
    .then(transition => {
        res.send(transition);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving transition."
        });
    });
};
// Retrieve and return all collages from the database.
exports.memberTransition = (req, res) => {
    Transition.find({ "memberId": req.params.memberId })
    .populate('memberId')
    .populate('monthId')
    .then(transition => {
        res.send(transition);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving transition."
        });
    });
};


// Find a single collage with a collageId
exports.findOne = (req, res) => {
    Transition.findById(req.params.transitionId)    
    .then(transition => {
        if(!transition) {
            return res.status(404).send({
                message: "transition not found with id " + req.params.transitionId
            });            
        }        
        res.send(transition);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "transition not found with id " + req.params.transitionId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving transition with id " + req.params.transitionId
        });
    });
};


// Update a transition identified by the transitionId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.transition) {
        return res.status(400).send({
            message: "transition name can not be empty"
        });
    }

    // Find transition and update it with the request body
    Transition.findByIdAndUpdate(req.params.transitionId, {
        transition: req.body.transition || "Untitled transition",
        year: req.body.year || "Untitled year"
    }, {new: true})
    .then(transition => {
        if(!transition) {
            return res.status(404).send({
                message: "transition not found with id " + req.params.transitionId
            });
        }
        res.send(transition);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "transition not found with id " + req.params.transitionId
            });                
        }
        return res.status(500).send({
            message: "Error updating transition with id " + req.params.transitionId
        });
    });
};

// Delete a transition with the specified transitionId in the request
exports.delete = (req, res) => {
    Transition.findByIdAndRemove(req.params.transitionId)
    .then(transition => {
        if(!transition) {
            return res.status(404).send({
                message: "transition not found with id " + req.params.transitionId
            });
        }
        res.send({message: "transition deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "transition not found with id " + req.params.transitionId
            });                
        }
        return res.status(500).send({
            message: "Could not delete transition with id " + req.params.transitionId
        });
    });
};
