const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const routes = require("./routes/v1");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
// parse url encoded
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.static("public"));

// security
app.use(xss());
app.use(cors());
app.options("*", cors);
app.use(helmet());

//set default view engine

app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.locals.message = req.session?.message;
  if (req.session) delete req.session.message;
  next();
});

//default route for image storage

app.use("/v1", routes);

app.get("/", (req, res) => {
  res.send("Hello to Digirent backend");
});

app.post("/create-payment-intent", async (req, res) => {
  const { transaction } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: transaction.rentalCost * 100,
    currency: "usd",
    payment_method_types: ["card"],
  });

  return res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get("/v1/api/payment-intent", async (req, res) => {
  const { paymentIntent } = req.query;
  const fetched = await stripe.paymentIntents.retrieve(paymentIntent);
  return res.json(fetched);
});

//handle 404
app.use((req, res, next) => {
  // TODO: add handler for routes not found
});

module.exports = app;
