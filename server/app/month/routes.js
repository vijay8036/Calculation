module.exports = (app) => {
    const  routesName = 'month'
    const month = require('./controller.js');
  
    // Create a new data
    app.post('/'+routesName, month.create);

    // Retrieve all data
    app.get('/'+routesName, month.findAll);

    // Retrieve all data where status is 0
    app.get('/monthstatus', month.findAllRunning);
    app.put('/monthstatus'+'/:'+routesName+'Id', month.updateStatus);

    // Retrieve a single data with Id
    app.get('/'+routesName+'/:'+routesName+'Id', month.findOne);

    
    // Update a data with Id
    app.put('/'+routesName+'/:'+routesName+'Id', month.update);

    // Delete a data with Id
    app.delete('/'+routesName+'/:'+routesName+'Id', month.delete);
   
}