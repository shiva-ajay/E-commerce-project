import express from "express";
import { allProduct, createProduct } from "../controller/product.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/create-product", upload.array("images"), createProduct);
router.get("/get-all-products-shop/:id", allProduct);

export default router;
