import User from "../model/user.js";
import path from "path";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/jwtToken.js";

// Create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(400).json({ message: "User already exists" });
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

    console.log("Creating user controller with data:", user);

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account!`,
      });
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields!" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    sendToken(user, 201, res);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: "Log out Successful!"
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}