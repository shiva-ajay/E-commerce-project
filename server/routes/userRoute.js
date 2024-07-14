import express from "express";
import { createUser, getUser, loginUser } from "../controller/user.js";
import { upload } from "../middleware/multer.js";
import { activateUser } from "../controller/activation.js";
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router();

router.post("/create-user", upload.single("file"), createUser);
router.post("/activation", activateUser);
router.post("/login-user", loginUser);
router.get("/getuser", isAuthenticated, getUser);


export default router;