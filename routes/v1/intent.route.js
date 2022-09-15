const router = require("express").Router();
const {  authenticateToken} = require("../../middlewares/auth");
const {createPaymentIntent, getPaymentIntent} = require("../../controllers/intent.controller");

router.post("/create-payment-intent", authenticateToken, createPaymentIntent);
router.get("/payment-intent", authenticateToken, getPaymentIntent);



module.exports = router;
