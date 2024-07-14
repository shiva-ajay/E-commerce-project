import express from "express";
import { createUser } from "../controller/userController.js";
import { upload } from "../middleware/multer.js";


const router = express.Router();

router.post("/create-user", upload.single("file"), createUser);


export default router;