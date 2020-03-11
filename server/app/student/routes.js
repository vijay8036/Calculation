

module.exports = (app) => {
    const  routesName = 'student'
    const collage = require('./controller.js');
  
    // Create a new data
    app.post('/'+routesName, collage.create);

    // Retrieve all data
    app.get('/'+routesName, collage.findAll);

    // Retrieve a single data with Id
    app.get('/'+routesName+'/:'+routesName+'Id', collage.findOne);

    // Update a data with Id
    app.put('/'+routesName+'/:'+routesName+'Id', collage.update);

    // Delete a data with Id
    app.delete('/'+routesName+'/:'+routesName+'Id', collage.delete);
}