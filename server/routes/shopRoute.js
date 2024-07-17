import express from "express";
import { createShop, loadShop, loginShop } from "../controller/shop.js";
import { upload } from "../middleware/multer.js";
import { activateSeller } from "../controller/activateSeller.js";
import { isSeller } from "../middleware/auth.js";




const router = express.Router();

router.post("/create-shop", upload.single("file"), createShop);
router.post("/activation", activateSeller);
router.post("/login-shop", loginShop);
router.get("/getSeller", isSeller, loadShop);

 


export default router;