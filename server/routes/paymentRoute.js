import express from "express";
import { Payment, stripeapikey } from "../controller/payment.js";


const router = express.Router();

router.post("/process", Payment);
router.get("/stripeapikey", stripeapikey);


export default router;
