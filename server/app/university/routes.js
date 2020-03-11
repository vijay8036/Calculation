

module.exports = (app) => {
    const  routesName = 'university'
    const university = require('./controller.js');
  
    // Create a new data
    app.post('/'+routesName, university.create);
    // Create a new data
    app.post('/login', university.login);
    // Create a new data
    app.get('/logindata/:token', university.loginData);
    // Create a new search data
    app.get('/search/:searchKey', university.search);
    // Create a new data
    app.post('/universityBulk', university.createBulk);

    // Retrieve all data
    app.get('/'+routesName, university.findAll);

    // Retrieve a single data with Id
    app.get('/'+routesName+'/:'+routesName+'Id', university.findOne);

    // Update a data with Id
    app.post('/updateuniversity/:'+routesName+'Id', university.update);

    // Delete a data with Id
    app.delete('/'+routesName+'/:'+routesName+'Id', university.delete);

     // Retrieve a single data with Id
     app.get('/'+routesName+'/pagination/:pageNo', university.findByPageNO);
}