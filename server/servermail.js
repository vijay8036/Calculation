const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
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


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

app.post('/api/joinMailingList', (req, res) => {
    const {firstName, lastName, emailAddress} = req.body
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.USER_EMAIL, //sender email address
            pass: process.env.USER_PASS //sender email password
        }
    });

    let mailOptions = {
        from: `"Mailing List Request" <${process.env.USER_EMAIL}>`, // sender email address
        to: emailAddress, //email address you want to send email to.
        subject: 'Welcome!', // Subject line
        text: `Thanks for joining our mailing list ${firstName} ${lastName}!`  //body of email.       
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.send(error)
        }
        res.status(200).send(info);
    });
})
// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});