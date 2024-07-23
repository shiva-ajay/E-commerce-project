import express from "express";
import { createUser, getUser, loginUser, logout, updateAvatar, updatePassword, updateUser } from "../controller/user.js";
import { upload } from "../middleware/multer.js";
import { activateUser } from "../controller/activation.js";
import { isAuthenticated } from "../middleware/auth.js";


const router = express.Router();

router.post("/create-user", upload.single("file"), createUser);
router.post("/activation", activateUser);
router.post("/login-user", loginUser);
router.get("/getuser", isAuthenticated, getUser);
router.get("/logout", isAuthenticated, logout);
router.put("/update-user-info", isAuthenticated, updateUser);
router.put("/update-avatar", isAuthenticated, updateAvatar);
router.put("/update-user-password", isAuthenticated, updatePassword);


export default router;