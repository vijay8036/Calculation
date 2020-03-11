module.exports = (app) => {
    const  routesName = 'member'
    const member = require('./controller.js');
  
    // Create a new data
    app.post('/'+routesName, member.create);

    // Retrieve all data
    app.get('/'+routesName, member.findAll);

    // Retrieve a single data with Id
    app.get('/'+routesName+'/:'+routesName+'Id', member.findOne);
    
    // Update a data with Id
    app.post('/'+routesName+'/:'+routesName+'Id', member.update);

    // Delete a data with Id
    app.delete('/'+routesName+'/:'+routesName+'Id', member.delete);
   
}