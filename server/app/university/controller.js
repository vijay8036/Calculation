const University = require('./model.js');
const mongoose = require('mongoose')
const uni = mongoose.model('university')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConfig = require('../../config/database.config.js');
const jwtDecode = require('jwt-decode');
// Create and Save a new University
exports.createBulk = (req, res) => {
    console.log(req.body)
    // Validate request
    if(req.body.length == 0) {       
        return res.status(400).send({
            message: "University content can not be empty"
        });
    }

    // Save University in the database
    uni.insertMany(req.body)
    .then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the university."
        });
    });
};
// Create and Save a new University
exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if(!req.body.name) {      
        return res.status(400).send({
            message: "University content can not be empty"
        });
    }

    const saltRounds = 10;
    const myPassword = req.body.password || "vijay"


    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPassword, salt, function(err, hash) {
            // Create a university
            const university = new University({
                name:req.body.name,
                password: hash
            });
            // Save University in the database
            university.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the university."
                });
            });
        });
    });

    

};

exports.login = (req, res) => {
    University.findOne({
      name: req.body.name
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.send({status:401, success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
            if (isMatch && !err) {
                // if user is found and password is right create a token
               jwt.sign(
                     user.toJSON(),
                     dbConfig.secret,
                    { expiresIn: "30m" },
                    (err, token) => {
                      if (err) throw err;
                      console.log(token)
                      res.json({
                        token                        
                      });
                    }
                  );
             
              } else {
                res.send({status:401, success: false, msg: 'Authentication failed. Wrong password.'});
              }
        });
      
      }
    });
  };
  // Find a single university with a universityId
exports.loginData = (req, res) => {  
    var token = req.params.token 
    var decoded = jwtDecode(token);
    University.findById(decoded._id)
    .then(university => {
        if(!university) {
            return res.status(404).send({
                message: "university not found with id " + decoded._id
            });            
        }
        res.send(university);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "university not found with id " + decoded._id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving university with id " + decoded._id
        });
    });
};

exports.search = (req, res) => {
    University.find({ name: {$regex: req.params.searchKey, $options: "$i"}})
    .then(students => {
         res.send(students);
     }).catch(err => {
         res.status(500).send({
             message: err.message || "Some error occurred while retrieving students."
         });
     });
  };

// Retrieve and return all universitys from the database.
var countLimit = 10
exports.findAll = (req, res) => {
    University.find()
    .then(universitys => {
        University.find().countDocuments('_id')
        .then(universitysCount => {           
            res.send({universitys: universitys,universitysCount:universitysCount,countLimit:countLimit} );
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving universitys."
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving universitys."
        });
    });    
};
// exports.findAll = (req, res) => {
//     const term = 'salvi  '
//     University.find({ $text: { $search: term }, })
//     .then(universitys => {
//         res.send(universitys);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving students."
//         });
//     });
// };

exports.findByPageNO = (req, res) => {
    
    var pageNo = parseInt(req.params.pageNo);
    University.find().skip(pageNo * countLimit).limit(countLimit)
    .then(universitys => {
        res.send(universitys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving universitys."
        });
    });    
};


// Find a single university with a universityId
exports.findOne = (req, res) => {
    University.findById(req.params.universityId)
    .then(university => {
        if(!university) {
            return res.status(404).send({
                message: "university not found with id " + req.params.universityId
            });            
        }
        res.send(university);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "university not found with id " + req.params.universityId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving university with id " + req.params.universityId
        });
    });
};

// Update a university identified by the universityId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "university name can not be empty"
        });
    }

    // Find university and update it with the request body
    University.findByIdAndUpdate(req.params.universityId, {
        name: req.body.name || "Unnamed university"
    }, {new: true})
    .then(university => {
        if(!university) {
            return res.status(404).send({
                message: "University not found with id " + req.params.universityId
            });
        }
        res.send(university);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "University not found with id " + req.params.universityId
            });                
        }
        return res.status(500).send({
            message: "Error updating university with id " + req.params.universityId
        });
    });
};

// Delete a university with the specified universityId in the request
exports.delete = (req, res) => {
    University.findByIdAndRemove(req.params.universityId)
    .then(university => {
        if(!university) {
            return res.status(404).send({
                message: "University not found with id " + req.params.universityId
            });
        }
        res.send({message: "University deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "University not found with id " + req.params.universityId
            });                
        }
        return res.status(500).send({
            message: "Could not delete university with id " + req.params.universityId
        });
    });
};
