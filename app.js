const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const routes = require('./routes/v1');
const bodyParser = require('body-parser');

const app = express();
// parse url encoded
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })) // for form data
app.use(express.static('public'));

// security
app.use(xss());
app.use(cors());
app.options('*', cors);
app.use(helmet());

//set default view engine

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.message = req.session?.message;
    if (req.session) delete req.session.message;
    next();
});

//default route for image storage

app.use('/v1', routes);

app.get('/', (req, res) => {
    res.send ("hello to digirent backend")
})

//handle 404
app.use((req,res,next) => {
   // TODO: add handler for routes not found
})


module.exports = app;
