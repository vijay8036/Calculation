const Month = require('./model.js');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const monthModel = mongoose.model('month');
// Create and Save a new collage
exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if(!req.body.month) {       
        return res.status(400).send({
            message: "Collage content can not be empty"
        });
    }

    // Create a collage
    const month = new Month({
        month: req.body.month || "Untitled month",
        year: req.body.year || "Untitled year",
        status: req.body.status || 0,
       
    });

    // Save month in the database
    // Month.save()
    //     .then(data => {           
    //         res.send(data);               
    //     }).catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occurred while creating the collage."
    //         });
    //     });


        Month.updateOne( 
            {$and:[{month:month.month},{year:month.year}]},
           { $setOnInsert: month },
           { upsert: true }, function(err, data) {
         
             let response = { sucess: true, msg: "The User Created Successfully"};
            
             if(err){
                 response.sucess=false;
                 response.status=500;
                 response.msg="There was a problem registering the user.";
                 console.log("There was a problem registering the user.")
             }else if(!data.upserted){      
                 response.msg="Month is Already Exists";
                 console.log("Month is Already Exists");     
                 res.send(data);    
                  
             }else{
                res.send(data);                
             }
           });
};

// Retrieve and return all collages from the database.
exports.findAll = (req, res) => {
    Month.find().sort({"_id":-1})   
    .then(month => {
        res.send(month);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving month."
        });
    });
};
exports.findAllRunning = (req, res) => {
    Month.find({status: 0 }).sort({"_id":-1})   
    .then(month => {
        res.send(month);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving month."
        });
    });
};

// Find a single collage with a collageId
exports.findOne = (req, res) => {
    Month.findById(req.params.monthId)    
    .then(month => {
        if(!month) {
            return res.status(404).send({
                message: "month not found with id " + req.params.monthId
            });            
        }        
        res.send(month);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "month not found with id " + req.params.monthId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving month with id " + req.params.monthId
        });
    });
};


// Update a month identified by the monthId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.month) {
        return res.status(400).send({
            message: "month name can not be empty"
        });
    }

    // Find month and update it with the request body
    Month.findByIdAndUpdate(req.params.monthId, {
        month: req.body.month || "Untitled month",
        year: req.body.year || "Untitled year",
    }, {new: true})
    .then(month => {
        if(!month) {
            return res.status(404).send({
                message: "month not found with id " + req.params.monthId
            });
        }
        res.send(month);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "month not found with id " + req.params.monthId
            });                
        }
        return res.status(500).send({
            message: "Error updating month with id " + req.params.monthId
        });
    });
};

exports.updateStatus = (req, res) => {
  
    // Find month and update it with the request body
    Month.findByIdAndUpdate(req.params.monthId, {
        status: req.body.status || 0,
    }, {new: true})
    .then(month => {
        if(!month) {
            return res.status(404).send({
                message: "month not found with id " + req.params.monthId
            });
        }
        res.send(month);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "month not found with id " + req.params.monthId
            });                
        }
        return res.status(500).send({
            message: "Error updating month with id " + req.params.monthId
        });
    });
};

// Delete a month with the specified monthId in the request
exports.delete = (req, res) => {
    Month.findByIdAndRemove(req.params.monthId)
    .then(month => {
        if(!month) {
            return res.status(404).send({
                message: "month not found with id " + req.params.monthId
            });
        }
        res.send({message: "month deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "month not found with id " + req.params.monthId
            });                
        }
        return res.status(500).send({
            message: "Could not delete month with id " + req.params.monthId
        });
    });
};
