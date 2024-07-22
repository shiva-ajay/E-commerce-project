import express from "express";
import { allProduct, createProduct, deleteProduct } from "../controller/product.js";
import { upload } from "../middleware/multer.js";
import { isSeller } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-product", upload.array("images"), createProduct);
router.get("/get-all-products-shop/:id", allProduct);
router.delete("/delete-shop-product/:id",isSeller, deleteProduct);

export default router;
