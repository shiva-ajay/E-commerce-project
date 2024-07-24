import express from "express";
import { isSeller } from "../middleware/auth.js";
import { addPlan, getPlanDetails, getPlans } from "../controller/subscription.js";


const router = express.Router();


router.post("/add-plan", addPlan);
router.get("/get-plans",isSeller, getPlans);
router.get("/plan-details",isSeller, getPlanDetails);



export default router;