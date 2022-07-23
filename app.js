const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const routes = require('./routes/v1');

const app = express();

// security config
app.use(helmet());

// parse json request with express
app.use(express.json())

// parse url encoded
app.use(express.urlencoded({extended: true}))

// sanitize request
app.use(xss());

// cross origin enable

app.use(cors());
app.options('*', cors);


app.use('/v1', routes);

//handle 404
app.use((req,res,next) => {
   // TODO: add handler for routes not found
})

module.exports = app;
