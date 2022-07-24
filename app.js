const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const routes = require('./routes/v1');
const bodyParser = require('body-parser');
const session = require('express-session');

const multer  = require('multer');
const forms = multer();

const app = express();


// parse url encoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(forms.array());

// sanitize request
app.use(xss());

// cross origin enable
app.use(helmet());
app.set('view engine', 'ejs');

// security
app.use(xss());
app.use(cors());
app.options('*', cors);
//set default view engine

app.use('v1', routes);

//handle 404
app.use((req,res,next) => {
   // TODO: add handler for routes not found
})


module.exports = app;
