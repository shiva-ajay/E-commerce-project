import express from "express";
import { createProduct } from "../controller/product.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/create-product", upload.array("images"), createProduct);

export default router;
