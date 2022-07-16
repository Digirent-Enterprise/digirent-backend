const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const { jwtStrategy } = require('./config/passport');
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
app.use(mongoSanitize());

// cross origin enable

app.use(cors());
app.options('*', cors);

//jwt auth

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/v1', routes);

//handle 404
app.use((req,res,next) => {
   // TODO: add handler
})

module.exports = app;
