require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require("morgan");
const categoryRoute = require("../routes/v1/category.route");
const productRoute = require("../routes/v1/product.route");

const app = express();
const PORT = process.env.PORT || 4000;

// database connection
mongoose.connect(process.env.DB_URI, {useNewUrlParSer: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to the database'));

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'secret key',
    saveUninitialized: true,
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json())
app.use("/uploadedImage", express.static('uploadedImage'))

app.use(cors());
app.use(morgan("common"))


// set template engine
app.set('view engine', 'ejs');


// routes
app.use("/v1/category", categoryRoute);
app.use("/v1/product", productRoute);

app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})
