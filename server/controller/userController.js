import userModel from "../model/userModel.js";
import path from "path";
import { jwt } from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await userModel.findOne({ email });
  
    if (userEmail) {

      return res.status(400).json({ error: "User already exists" });
    }
  
    let avatarData = {};

    if (req.file) {
      const filename = req.file.filename;
      const fileUrl = path.join(filename);
      avatarData = {
        public_id: filename,
        url: fileUrl,
      };
    }

    const user = {
      name,
      email,
      password,
      avatar: avatarData,
    };

    const newUser = await userModel.create(user);
    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ error: error.message });
  }
};