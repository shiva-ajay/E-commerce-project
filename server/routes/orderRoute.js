import express from "express";
import { createOrder, usersOrders } from "../controller/order.js";




const router = express.Router();

router.post("/create-order", createOrder);
router.get("/get-all-orders/:userId", usersOrders);



export default router;
