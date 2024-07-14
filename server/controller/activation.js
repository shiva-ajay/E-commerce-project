import User from "../model/user.js";
import path from "path";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/jwtToken.js";



export const activateUser = async (req, res) => {
    try {
      const { activation_token } = req.body;
  
      let newUser;
      try {
        newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
      } catch (error) {
        console.error("Token verification error:", error);
        return res.status(400).json({ error: "Invalid Token" });
      }
  
      if (!newUser) {
        return res.status(400).json({ error: "Invalid Token" });
      }
  
      const { name, email, password, avatar } = newUser;
  
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      console.log("Creating user with data:", { name, email, avatar, password });
  
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });
  
      sendToken(user, 201, res);
    } catch (error) {
      console.error("User activation error:", error);
      res.status(500).json({ error: error.message });
    }
  };
  