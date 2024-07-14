import express from "express";
import { createUser, loginUser } from "../controller/user.js";
import { upload } from "../middleware/multer.js";
import { activateUser } from "../controller/activation.js";


const router = express.Router();

router.post("/create-user", upload.single("file"), createUser);
router.post("/activation", activateUser);
router.post("/login-user", loginUser);



export default router;