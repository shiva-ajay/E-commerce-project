import Stripe from 'stripe';
import 'dotenv/config';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 



export const Payment = async (req, res) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: {
          company: "Shiva",
        },
      });
      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    };


export const stripeapikey = async (req, res) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
}