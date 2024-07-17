import User from "../model/user.js";
import jwt from "jsonwebtoken";
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

    console.log("Creating user activation with data:", { name, email, avatar, password });

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    await user.save(); // Save the new user to the database

    sendToken(user, 201, res);
  } catch (error) {
    console.error("User activation error:", error);
    res.status(500).json({ error: error.message });
  }
};
