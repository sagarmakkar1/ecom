const router = require("express").Router();
require("dotenv").config(); //solved the issue but no idea

const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
	stripe.paymentIntents.create(
		{
			amount: req.body.amount,
			currency: "inr",
			automatic_payment_methods: { enabled: true },
		},
		(stripeErr, stripeRes) => {
			if (stripeErr) {
				res.status(500).json(stripeErr);
			} else {
				res.status(200).json(stripeRes);
			}
		}
	);
});

module.exports = router;
