module.exports = (app) => {
    const  routesName = 'transition'
    const transition = require('./controller.js');
  
    // Create a new data
    app.post('/'+routesName, transition.create);

    // // Retrieve all data
    app.get('/'+routesName, transition.findAll);
    // Retrieve all data
    app.get('/totalwithdrow', transition.memberDetails);
    // Retrieve all data
    app.get('/totaltransitionsum', transition.totalTransitionDetails);
    // Retrieve all data
    app.get('/membertransition/:memberId', transition.memberTransition);

    // Retrieve a single data with Id
    app.get('/'+routesName+'/:'+routesName+'Id', transition.findOne);
    
    // Update a data with Id
    app.post('/'+routesName+'/:'+routesName+'Id', transition.update);

    // Delete a data with Id
    app.delete('/'+routesName+'/:'+routesName+'Id', transition.delete);
   
}