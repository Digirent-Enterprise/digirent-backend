const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    const {transaction} = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: transaction.rentalCost * 100,
        currency: "usd",
        payment_method_types: ["card"],
    });
    return res.send({
        clientSecret: paymentIntent.client_secret,
    });
}

const getPaymentIntent = async (req, res) => {
    const { paymentIntent } = req.query;
    const fetched = await stripe.paymentIntents.retrieve(paymentIntent);
    return res.json(fetched);
};

module.exports = {
    createPaymentIntent,
    getPaymentIntent
}