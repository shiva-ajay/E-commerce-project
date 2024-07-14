import User from "../model/user.js";
import path from "path";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/jwtToken.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

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

    console.log("Creating user with data:", user);


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
      res.status(500).json({ error: "Email could not be sent" });
    }
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};



// Login


export const loginUser = ()=>{

}

