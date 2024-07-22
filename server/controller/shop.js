import Shop from "../model/shop.js"
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/jwtToken.js";
import path from "path";
import sendShopToken from "../utils/shopToken.js";

export const createShop = async (req, res) => {
  try {
    const { email, name, password, address, phoneNumber, zipCode } = req.body;
    const existingShop = await Shop.findOne({ email });

    if (existingShop) {
      return res.status(400).json({ message: "User already exists" });
    }

    let avatarData = {};
    if (req.file) {
      const filename = req.file.filename;
      const fileUrl = path.join("/uploads", filename);
      avatarData = { public_id: filename, url: fileUrl };
    }

    const newShop = {
      name,
      email,
      password,
      avatar: avatarData,
      address,
      phoneNumber,
      zipCode,
    };

    const activationToken = jwt.sign(newShop, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
    const activationUrl = `http://localhost:5173/shop/activation/${activationToken}`;

    try {
      await sendMail({
        email: newShop.email,
        subject: "Activate your Shop",
        message: `Hello ${newShop.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${newShop.email} to activate your account!`,
      });
    } catch (error) {
      console.error("Email sending error:", error);
      res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error) {
    console.error("Error creating shop:", error);
    res.status(500).json({ message: error.message });
  }
};


export const loginShop = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields!" });
    }

    const user = await Shop.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    sendShopToken(user, 201, res);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};


export const loadShop = async (req, res) => {
  try {
    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    res.status(200).json({
      success: true,
      seller,
    });
    console.log(seller)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// log out from shop
  export const logOut = async (req, res) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }