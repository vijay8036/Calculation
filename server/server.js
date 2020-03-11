const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,HEAD,OPTIONS,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,contentType,Content-Type,Accept,Authorization");
    res.locals.user = req.user || null;
    next();
});

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// require('./app/routes/note.routes.js')(app);
require('./app/university/routes.js')(app);
require('./app/collage/routes.js')(app);
require('./app/student/routes.js')(app);
require('./app/month/routes.js')(app);
require('./app/member/routes.js')(app);
require('./app/transition/routes.js')(app);

// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3000");
});