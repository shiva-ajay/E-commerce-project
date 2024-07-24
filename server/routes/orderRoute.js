import express from "express";
import { createOrder, sellersOrders, usersOrders } from "../controller/order.js";




const router = express.Router();

router.post("/create-order", createOrder);
router.get("/get-all-orders/:userId", usersOrders);
router.get("/get-seller-all-orders/:shopId", sellersOrders);



export default router;
